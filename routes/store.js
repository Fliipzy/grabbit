const router = require("express").Router()

router.get("/", (req, res) => {
    res.sendFile("public/html/stores.html", { root : "."})
})

module.exports = router