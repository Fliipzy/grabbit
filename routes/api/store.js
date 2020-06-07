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

//Get all stores
router.get("/", async (req, res) => {

    //Select stores and innerjoin other tables for extra data
    let stores = await Store.query()
    .select("store.name", "store.created_at", 
            "user.username AS owner", "location.city_name",
            "location.street_name", "location.street_number",
            "location.postal_code")
    .innerJoin("store_address AS location", {"location.store_id": "store.id"})
    .innerJoin("store_admin", {"store_admin.store_id": "store.id"})
    .innerJoin("user", {"user.id": "store_admin.admin_id"})
        .where("store_admin.admin_id", 1)

    //Check if array is not empty
    if (stores.length > 0) {

        //Set response status to OK
        res.status(200)
    }
    else {
        
        //Set response status to Not Found
        res.status(404)
    }

    //Finally return either store array json or empty json
    res.json(stores)
})

module.exports = router