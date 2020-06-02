const router = require("express").Router()

router.get("/", (req, res) => {
    //Check if session is authenticated
    if (req.session.authenticated) {
        res.render("gchat.ejs", { session : req.session })
    }
    else {
        res.redirect("/login")
    }
})

module.exports = router