const { Model } = require("objection")

class StoreRating extends Model {

    static get tableName() {
        return "store_rating"
    }

}

module.exports = StoreRating
