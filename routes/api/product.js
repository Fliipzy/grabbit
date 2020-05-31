const router = require('express').Router()
const Store = require('../../models/Store.js')

//Get all products from specific store
router.get('/:sid/products', async (req, res) => {

    //Query all products from store
    let products = await Store.relatedQuery('products')

    //Check if product is empty

    //Return products json response
    res.status(200).json(products)
        
})

module.exports = router