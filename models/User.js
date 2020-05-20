const { Model } = require('objection')

class User extends Model {

    static get tableName() {
        return 'user'
    }

    static get relationMappings() {

        const UserInformation = require('./UserInformation.js')
        const Store = require('./Store.js')
        
        return {
            information: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserInformation,
                join: {
                    from: 'user.id',
                    to: 'user_information.id' 
                }
            },
            stores : {
                relation: Model.ManyToManyRelation,
                modelClass: Store,
                join : {
                    from: 'user.id',
                    through: {
                        from: 'store_admin.admin_id',
                        to: 'store_admin.store_id'
                    },
                    to: 'store.id'
                }
            }
        }
    }

}

module.exports = User