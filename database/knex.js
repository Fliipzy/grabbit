const dbauth = require('./configs/authentication.json');

module.exports = require('knex')({
    client : 'mysql',
    connection : {
        host : '127.0.0.1',
        user : dbinfo['username'],
        password : dbauth['password'],
        database : dbauth['schema']
    }
});

