const router = require("express").Router()
const User = require("../models/User.js")

//Intercept every profile/ request and make sure session is authenticated.
router.get("/*", (req, res, next) => {

    //Make sure session is authenticated
    if (req.session.authenticated) {
        next()
    }
    else {
        //Set status to 401 (Unauthorized) and redirect to login
        res.status(401).redirect("/login")
    }
})

router.get("/:uid", (req, res) => {

})

module.exports = router