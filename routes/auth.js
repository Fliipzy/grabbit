const router = require('express').Router()
const ratelimits = require('../configs/limiters.js')
const User = require('../models/User.js')
const UserInformation = require('../models/UserInformation.js')
const { v4: uuid } = require('uuid')
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

    //Try to find user with that email in db
    let user = await User.query()
        .select('username', 'information.email')
        .joinRelated('information')
        .where('information.email', email)
        .first()
    
    //If a user with that email has been found
    if (user != undefined) {

        //Generate universally unique identifier
        let id = uuid()

    }

    res.redirect('/forgot')
})

router.get('/reset/:uid', (req, res) => {

})

module.exports = router