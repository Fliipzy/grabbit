const { Model } = require("objection")

class StoreAddress extends Model {

    static get tableName() {
        return "store_address"
    }

    static get relationMappings() {
        const Store = require("./Store.js")

        return {
            store: {
                relation: Model.HasOneRelation,
                modelClass: Store,
                join: {
                    from: "store_address.store_id",
                    to: "store.id"
                }
            }
        }
    }

}

module.exports = StoreAddress
