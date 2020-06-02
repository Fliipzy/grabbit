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

//Importing bcrypt to hash passwords
const bcrypt = require('bcrypt')
const rounds = 12

router.get('/login', (req, res) => {
    res.render('auth/login.ejs', { session : req.session })
})

router.post('/login', ratelimits.login, async (req, res) => {

    //Retrieve login information
    let { username, password } = req.body

    //Try to find a user in db where username matches
    let user = await User.query()
        .select('user.id', 'user.username', 'user.password', 'role.role')
        .joinRelated('role')
        .where('username', username)
        .first()

    //If user has been found
    if (user != undefined) {

        //Compare given password with hashed password
        if (await bcrypt.compare(password, user.password)) {

            //Append these attributes to the session object
            req.session.authenticated = true
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            }

            //Redirect the authenticated user to the index
            res.status(200).redirect('/')
        }
    } 
    else {
        //Redirect to login page with status code 401
        res.status(401).redirect('/login#failed')
    }
})

router.get('/logout', (req, res) => {
    //Destroy session
    req.session.destroy()

    //Redirect to index
    res.redirect('/')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs', { session : req.session })
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

    //Use insertGraph to insert both user & userinformation
    await User.query().insertGraph({
        username: username,
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
    res.render('auth/forgot.ejs', { session : req.session })
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

        //Send reset mail
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                //Return status code 500 (Internal server error)
                return res.status(500).send()
            } 
            else {
                //Return status code 200 (OK)
                return res.status(200).send()
            }
        })
    }
    else {
        //Return status code 204 (No Content)
       return res.status(204).send()
    }
})

router.get('/reset/:uuid', async (req, res) => {

    //Retrieve the uuid from the request
    let { uuid } = req.params

    //Try to select reset-token where the given uuid matches
    let token = await knex('user_reset')
        .select('user_id', 'uuid', 'created_at')
        .where('uuid', uuid)
        .first()
        
    //Check if token is not undefined
    if (token != undefined) {
        res.render('auth/reset.ejs', { token: { user_id: token.user_id, uuid: token.uuid }, session : req.session })
    }
    else {
        res.status(404).send('No reset token with that UUID')
    }
})

router.post('/reset/:uuid', async (req, res) => {

    //Retrieve uuid & password from req params & body
    let { uuid } = req.params
    let { password } = req.body

    //Try to select reset-token where the given uuid matches
    let token = await knex('user_reset')
        .select('user_id', 'uuid', 'used')
        .where('uuid', uuid)
        .first()

    //If token is not undefined
    if (token != undefined) {
        
        //If token is already used
        if (token.used) {
            res.status(404).send('Reset token already used!')
        }

        //Hash the password
        let hashedPassword = await bcrypt.hash(password, rounds)

        //Reset password
        let result = await User.query()
            .patch({ password: hashedPassword})
            .where('id', token.user_id)
        
        //If one row was updated
        if (result) {
            res.redirect('/login')
        }
    }
})

module.exports = router