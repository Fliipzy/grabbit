const router = require("express").Router()

router.get("/", (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated == true) {

        //Redirect to stores endpoint
        res.sendFile("public/html/stores.html", { root : "."})
    }
    else {
        
        //Render the index view
        res.sendFile("public/html/index.html", { root : "."})
    }
})

router.get("/about", (req, res) => {
    res.render("about.ejs")
})

module.exports = router