const router = require('express').Router()

router.get('/', (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated == true) {
        //Render the authenticated index
        res.render('index_a.ejs', { session : req.session })
    }
    else {
        //Render the unauthenticated index
        res.render('index.ejs', { session : req.session })
    }

})

router.get('/about', (req, res) => {
    res.render('about.ejs')
})

module.exports = router