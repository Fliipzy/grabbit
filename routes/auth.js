const router = require('express').Router()
const ratelimits = require('../configs/limiters.js')
const User = require('../models/User.js')
const UserInformation = require('../models/UserInformation.js')

//Mail reset dependencies
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')
const emailCreds = require('../configs/mail_credentials.json')

//Transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: emailCreds['email'],
        pass: emailCreds['password']
    }
})

//Encryption
const bcrypt = require('bcrypt')
const rounds = 12

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.post('/login', ratelimits.login, async (req, res) => {
    //Retrieve login information
    let { username, password } = req.body

    //Try to find a user in db where username matches
    let users = await User.query()
        .select('user.username', 'user.password', 'role.role')
        .joinRelated('role')
        .where('username', username)
        .limit(1)

    //If user has been found
    if (users.length > 0) {
        //Compare given password with hashed password
        if (await bcrypt.compare(password, users[0].password)) {
            req.session.authenticated = true
            req.session.role = users[0].role
        }
    }
    //Redirect to login page with status code 401
    res.status(401).redirect('/login#failed')
})

router.get('/logout', (req, res) => {
    //Destroy session
    req.session.destroy()
})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.post('/signup', ratelimits.signup, async (req, res) => {
    //Retrieve sign up information
    let { username, password, email, firstname, lastname } = req.body

    //Check for already existing username & email
    let users = await User.query()
        .select('user.username', 'information.email')
        .joinRelated('information')
        .where('username', username)
        .orWhere('information.email', email)

    //If user(s) are found
    if (users > 0) {
        res.redirect('/signup#failed')
    }

    //We can safely insert new user into db
    let hashedPassword = await bcrypt.hash(password, rounds)

    //Use graphInsert to insert both user & userinformation
    await User.query().insertGraph({
        username: username.toLowerCase(),
        password: hashedPassword,
        information : {
            first_name: firstname,
            last_name: lastname,
            email: email
        }
    })

    //Redirect to login
    res.redirect('/login#signup-success')
})

router.get('/forgot', (req, res) => {
    res.render('auth/forgot.ejs')
})

const knex = require('../database/knexfile.js')

router.post('/forgot', async (req, res) => {
    //Retrieve email from request body
    let { email } = req.body

    //Try to find user where emails match, select user.id, user.username & information.email
    let user = await User.query()
        .select('user.id', 'user.username', 'information.email')
        .joinRelated('information')
        .where('information.email', email)
        .first()
    
    //If a user has been found
    if (user != undefined) {

        //Generate universally unique identifier
        let uuid = uuidv4()

        //Use knex to insert into 'user_reset' table
        await knex('grabbit.user_reset').insert({ user_id: user.id, uuid: uuid })


        //Setup mail options
        let mailOptions = {
            from: '"Grabbit Bot 🤖" <grabbitbot@gmail.com>',
            to: user.email,
            subject: 'Password reset',
            text: `Hi ${user.username}, here's your password reset link:\n https://localhost:3000/reset/${uuid}`
        }

        //Send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.json({"result" : "ERROR"})
            }
            console.log(info)
            res.json({"result" : "SUCCESS"})
        })
    }

    res.json({"result" : "no match"})
})

router.get('/reset/:uid', (req, res) => {

})

module.exports = router