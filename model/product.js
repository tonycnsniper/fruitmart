var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Passw0rd',
        database: 'fruitmart',
        charset: 'utf8'
    }
})

var bookshelf = require('bookshelf')(knex);

var product = bookshelf.Model.extend({
    tableName: 'product'
});