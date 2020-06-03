const router = require("express").Router()

router.get("/:sid", (req, res) => {
    res.render("products.ejs")
})

router.get("/:sid/:pid", (req, res) => {
    res.render("product.ejs")
})

router.get("/create/:sid", (req, res) => {
    
})

router.post("/update/:sid/:pid", (req, res) => {
    res.redirect("/:sid/:pid")
})

router.post("/delete/:sid/:pid", (req, res) => {
    res.redirect("/:sid")
})

module.exports = router