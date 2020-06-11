const { Model } = require("objection")

class Store extends Model {

    static get tableName() {
        return "store"
    }

    static get relationMappings() {

        const User = require("./User.js")
        const Product = require("./Product.js")
        const StoreAddress = require("./StoreAddress.js")
        const OpeningHours = require("./OpeningHours.js")
        const StoreFoodType = require("./StoreFoodType.js")
        const StoreRating = require("./StoreRating.js")

        return {

            //Administrators of the store
            admins: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "store.id",
                    through : {
                        from: "store_admin.store_id",
                        to: "store_admin.admin_id"
                    },
                    to: "user.id"
                }
            },
            //The stores products
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: "store.id",
                    to: "product.store_id"
                }
            },
            //location of the store
            location: {
                relation: Model.HasOneRelation,
                modelClass: StoreAddress,
                join: {
                    from: "store.id",
                    to: "store_address.store_id"
                }
            },
            openingHours: {
                relation: Model.HasManyRelation,
                modelClass: OpeningHours,
                join: {
                    from: "store.id",
                    to: "store_opening_hours.store_id"
                }
            },
            foodTypes: {
                relation: Model.HasManyRelation,
                modelClass: StoreFoodType,
                join: {
                    from: "store.id",
                    to: "store_food_type.store_id"
                }
            },
            rating: {
                relation: Model.HasOneRelation,
                modelClass: StoreRating,
                join: {
                    from: "store.id",
                    to: "store_rating.store_id"
                }
            }
        }

    }
}

module.exports = Store