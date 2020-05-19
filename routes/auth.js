const router = require('express').Router()

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.post('/authenticate', (req, res) => {
    
})

router.get('/signup', (req, res) => {
    res.render('/auth/signup.ejs')
})

router.post('/signup', (req, res) => {
    
})

module.exports = router