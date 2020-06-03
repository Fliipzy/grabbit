const { Model } = require("objection")

class UserRole extends Model {

    static get tableName() {
        return "user_role"
    }

    static get relationMappings () {

        const User = require("./User.js")

        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: "user_role.id",
                    to: "user.user_id"
                }
            }
        }
    }
}

module.exports = UserRole