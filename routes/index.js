const router = require("express").Router()

router.get("/", (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated == true) {

        //Redirect to stores endpoint
        res.redirect("/stores")
    }
    else {
        
        //Render the index view
        res.render("index.ejs", { session : req.session })
    }
})

router.get("/about", (req, res) => {
    res.render("about.ejs")
})

module.exports = router