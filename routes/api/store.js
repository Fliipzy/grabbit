const router = require("express").Router()
const Knex = require("../../database/knexfile")
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
				"l.street_name", "l.street_number", "l.postal_code",
				"p.image_name", "r.rating")
		.innerJoin("store_profile_image AS p", { "p.store_id": "store.id" })
		.innerJoin("store_address AS l", { "l.store_id": "store.id" })
		.innerJoin("store_rating AS r", { "r.store_id": "store.id" })
		.innerJoin("store_admin", { "store_admin.store_id": "store.id" })
		.innerJoin("user AS u", { "u.id": "store_admin.admin_id" })
		.where("store_admin.admin_id", 1)




	//Foreach store in stores
	for (let index = 0; index < stores.length; index++) {

		//Get number of reviews for each store
		let reviewsCount = await Knex.table("review").where("store_id", stores[index].id).count()

		//Append the reviews count to the store object
		stores[index].reviews_count = reviewsCount[0]["count(*)"]


		//Query opening hours data for corresponding store
		let openHours = await Store.relatedQuery("openingHours")
			.select("store_opening_hours.day",
				"store_opening_hours.opens_at",
				"store_opening_hours.closes_at")
			.for(stores[index].id)

		//Concat openHours array to store object
		stores[index].opening_hours = openHours

		//Query food type data for corresponding store
		let foodTypes = await Store.relatedQuery("foodTypes")
			.select("store_food_type.food_type")
			.for(stores[index].id)

		//Concat food types array to store object
		stores[index].food_types = []

		foodTypes.forEach(foodType => {
			stores[index].food_types.push(foodType.food_type)
		});
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

//Get specific store with matching sid
router.get("/:sid", async (req, res) => {

	//Retrieve the sid parameter
	let { sid } = req.params

	//Try to query the specific store
	let store = await Store.query().findById(sid)
		.select("store.name", "store.description",
			"a.city_name", "a.postal_code", "a.street_name", "a.street_number",
			"r.rating", "p.image_name")
		.joinRelated("location as a")
		.joinRelated("rating as r")
		.innerJoin("store_profile_image as p", { "store.id": "p.store_id" })


	//If store is undefined
	if (store != undefined) {

		//Return the store json data
		res.json(store)
	}
	else {
		res.status(404)
	}

})

module.exports = router