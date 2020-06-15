const router = require("express").Router()
const Store = require("../models/Store.js")

router.get("/", (req, res) => {
    res.sendFile("public/html/stores.html", { root : "." })
})

router.get("/:sid", async (req, res) => {

    //Retrieve the sid parameter
    let { sid } = req.params

    //First check if sid is valid
    let store = await Store.query().findById(sid)

    //If we found a store with matching sid
    if (store != undefined) {

        //Send the store.html file
        res.sendFile("public/html/store.html", { root: "." })
    }
    else {
        res.status(404).send("We couldn't find the store you were looking for!")
    }

})

module.exports = router