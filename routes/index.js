const router = require("express").Router()

router.get("/", (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated == true) {

        //Redirect to the stores view
        //res.redirect("/stores")
        res.sendFile("public/html/index.html", { root : "."})
    }
    else {
        
        //Send the index.html file
        res.sendFile("public/html/index.html", { root : "."})
    }
})

router.get("/about", (req, res) => {
    res.render("about.ejs")
})

module.exports = router