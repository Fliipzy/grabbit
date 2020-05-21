const { Model } = require('objection')

class Review extends Model {

    static get tableName() {
        return 'review'
    }

} 

module.exports = Review