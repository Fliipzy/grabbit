const { Model } = require("objection")

class StoreFoodType extends Model {

    static get tableName() {
        return "store_food_type"
    }
}

module.exports = StoreFoodType