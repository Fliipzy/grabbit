const router = require('express').Router()

router.get('/', (req, res) => {
    if (req.session.authenticated) {
        
    }
})

module.exports = router