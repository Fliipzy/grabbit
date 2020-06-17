const router = require("express").Router()
const Store = require("../../models/Store.js")

//Get all products from specific store
router.get("/:sid", async (req, res) => {

    //Retrieve the sid
    let {sid} = req.params

    //Query all products for store with given sid
    let products = await Store.relatedQuery("products").for(sid)
        .select("product.id", "product.name", "product.description", "product.price",
                "t.name as food_type")
        .innerJoin("product_type as t", { "product.type": "t.id" })

    //Check if product array has any elements
    if (products.length > 0) {
        
        //Set status code to 200
        res.status(200)
    }
    else {

        //Set status code to 404 (Not Found)
        res.status(404)
    }

    //Finally return products
    res.json(products)
})

module.exports = router