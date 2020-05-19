const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('stores.ejs')
})

router.get('/:sid', (req, res) => {
    res.render('store.ejs')
})

router.post('/update/:sid', (req, res) => {
    res.redirect('/:sid')
})

module.exports = router