const { Model } = require('objection')

class Store extends Model {

    static get tableName() {
        return "store"
    }

    static get relationMappings() {

        const User = require('./User.js')
        const Product = require('./Product.js')

        return {
            //Administrators of the store
            admins: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'store.id',
                    through : {
                        from: 'store_admin.store_id',
                        to: 'store_admin.admin_id'
                    },
                    to: 'user.id'
                }
            },
            //The stores products
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'store.id',
                    to: 'product.store_id'
                }
            }
        }

    }
}

module.exports = Store