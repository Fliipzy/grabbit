const router = require("express").Router()

//API endpoint to receive the current session information
router.get("/", (req, res) => {
    res.json(req.session)
})

module.exports = router