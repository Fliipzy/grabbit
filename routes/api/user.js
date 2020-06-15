const router = require("express").Router()
const User = require("../../models/User.js")
const Knex = require("../../database/knexfile.js")

router.get("/*", (req, res, next) => {

    //Make sure every request is authenticated and has admin role 
    if (req.session.user && req.session.user.role == "admin") {

        //Proceed to request specific endpoint
        next()
    } 
    else {

        //Send back 401 status (Unauthorized)
        res.status(401).send("You're not authorized to be here!")
    }
})

//Get all users
router.get("/", async (req, res) => {

    //Query all users from database
    let users = await User.query()
        .select("user.username", "user.active", 
                "user.created_at", "role.role", 
                "information.first_name",
                "information.last_name",
                "information.email")
        .joinRelated("information")
        .joinRelated("role")

    if (users.length > 0) {

        //Set status code to 200
        res.status(200)
    } 
    else {

        //Set status code to 404 (Not Found)
        res.status(404)
    }

    res.json(users)
})

//Get specific user
router.get("/:uid", async (req, res) => {

    //Retrieve user id from params
    let { uid } = req.params

    //Try to find the specific user
    let user = await User.query()
    .select("user.id", "user.username", "user.active", "user.created_at", 
            "info.first_name", "info.last_name", "info.email", "info.updated_at")
    .innerJoin("user_information AS info", { "user.user_information_id" : "info.id" })
    .findById(uid)

    //If user was found
    if (user != undefined) {

        //Find all the stores this user owns or administrates
        let stores = await Knex("store")
        .select("store.id", "store.name", "sa.admin_type")
        .innerJoin("store_admin as sa", { "store.id": "sa.store_id" })
        .where("sa.admin_id", uid)

        //If stores are not empty
        if (stores.length > 0) {
            
            //Add stores data to user object
            user.stores = stores
        }

        //Send user json data
        res.json(user)
    }
    else {
        res.status(404)
    }
})

module.exports = router