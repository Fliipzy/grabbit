const auth = require("../configs/database_credentials.json");

const knex = require("knex")({
    client : "mysql",
    connection : {
        host : "127.0.0.1",
        user : auth["username"],
        password : auth["password"],
        database : auth["schema"]
    }
})

module.exports = knex

