const router = require("express").Router()
const Store = require("../../models/Store.js")

router.get("/*", (req, res, next) => {
    
    //Make sure that session is authenticated
    if (req.session.authenticated) {
        next()
    } 
    else {
        
        //Send back 401 status (Unauthorized)
        res.status(401).send("You're not authorized to be here!")
    }
})

//Get specific store
router.get("/:sid", async (req, res) => {

    //Retrieve the sid
    let {sid} = req.params

    //Try to query specific store
    let store = await Store.query()
        .withGraphFetched("location")
        .findById(sid)

    //Check if store is not undefined
    if (store != undefined) {

        //Set response status to OK
        res.status(200)
    }
    else {
        
        //Set response status to Not Found
        res.status(404)
    }
    //Finally return either store json or empty json
    res.json({store})
})

module.exports = router