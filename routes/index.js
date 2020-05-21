const router = require('express').Router()

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('index.ejs')
})

router.get('/about', (req, res) => {
    res.render('about.ejs')
})

module.exports = router