const router = require('express').Router()
const User = require('../models/User.js')

router.get('/', async (req, res) => {
    let users = await User.query()
    res.render('user/users.ejs', { users : users })
})

router.get('/:id', (req, res) => {
    res.render('user/user.ejs')
})

router.post('/update/:id', (req, res) => {

})

module.exports = router