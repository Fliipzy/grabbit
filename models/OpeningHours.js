const { Model } = require("objection")

class OpeningHours extends Model {

    static get tableName() {
        return "store_opening_hours"
    }
}

module.exports = OpeningHours