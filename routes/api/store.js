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

    //Query all stores and their location information
    let stores = await Store.query()
        .select("store.*", "u.username AS owner", "l.city_name",
                "l.street_name", "l.street_number", "l.postal_code")
        .innerJoin("store_address AS l", { "l.store_id": "store.id" })
        .innerJoin("store_admin", { "store_admin.store_id": "store.id"})
        .innerJoin("user AS u", { "u.id": "store_admin.admin_id"})
            .where("store_admin.admin_id", 1)

    
    //Foreach store in stores
    for (let index = 0; index < stores.length; index++) {

        //Query opening hours data for corresponding store
        let openHours = await Store.relatedQuery("openingHours")
            .select("store_opening_hours.day",
                    "store_opening_hours.opens_at",
                    "store_opening_hours.closes_at")
            .for(stores[index].id)

        //Concat openHours array to corresponding stores objects
        stores[index].opening_hours = openHours
    }

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