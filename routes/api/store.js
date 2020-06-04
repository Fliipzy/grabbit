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

    //Try to query specific store
    let stores = await Store.query()
        .select("store.id", "store.name", "store.created_at", 
                "location.city_name", "location.postal_code",
                "location.street_name", "location.street_number",
                "owner.username")
                .joinRelated("location")
                .innerJoin("store_admin as admins")
                .innerJoin("user as owner")
                    .where("owner.id", "admins.admin_id")
                    

    console.log(stores)

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
    res.json({stores})
})

module.exports = router