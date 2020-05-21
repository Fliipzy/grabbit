const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const saltRounds = 12

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.post('/login', async (req, res) => {

    //Retrieve login information
    let { username, password } = req.body

    console.log(req.session.cookie)

    //Try selecting user from database
    let users = await User.query().where('username', username).limit(1)

    //If user has been found
    if (users.length > 0) {

        //Compare given password with hashed password
        if (await bcrypt.compare(password, users[0].password)) {
            req.session
        }
    }

    //Redirect to login page again
    res.redirect('/login#failed')
})

router.get('/logout', (req, res) => {
    //Destroy session
})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res) => {
    //Retrieve sign up information
    let { username, password, email, firstname, lastname } = req.body

    //Check for already existing username & email

})

module.exports = router