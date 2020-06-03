const { Model } = require("objection")

class Review extends Model {

    static get tableName() {
        return "review"
    }
    
    static get relationMappings() {
        
    }
} 

module.exports = Review