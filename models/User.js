const { Model } = require('objection')

class User extends Model {

    static get tableName() {
        return 'user'
    }

    static get relationMappings() {

        const UserInformation = require('./UserInformation.js')
        const UserRole = require('./UserRole.js')
        const Store = require('./Store.js')
        
        return {
            information: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserInformation,
                join: {
                    from: 'user.user_information_id',
                    to: 'user_information.id' 
                }
            },
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'user.role_id',
                    to: 'user_role.id'
                }
            }
            ,
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