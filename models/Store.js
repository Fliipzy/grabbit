const { Model } = require('objection')

class Store extends Model {

    static get tableName() {
        return "store"
    }

    static get relationMappings() {

        const User = require('./User.js')

        return {
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
            }
        }

    }
}

module.exports = Store