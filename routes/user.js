const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('users.ejs')
})

router.get('/:id', (req, res) => {
    res.render('user.ejs')
})

router.post('/update/:id', (req, res) => {

})

module.exports = router