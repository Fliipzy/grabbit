const { Model } = require('objection')

class UserInformation extends Model {

    static get tableName() {
        return "user_information"
    }
    
    static get relationMappings() {

        const User = require('./User.js')

        return {
            user : {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'user_information.id',
                    to: 'user.id'
                }
            }
        }

    }
}

module.exports = UserInformation