const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("stores.ejs", { session : req.session })
})

module.exports = router