const router = require("express").Router()

router.get("/", (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated) {
        res.sendFile("public/html/gchat.html", { root : "."})
    }
    else {
        res.redirect("/login")
    }
})

module.exports = router