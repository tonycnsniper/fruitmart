'use strict'

// var knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'Passw0rd',
//         database: 'fruitmart',
//         charset: 'utf8'
//     }
// });

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-235-124-2.compute-1.amazonaws.com',
        user: 'ubnmafjgbzgyjr',
        password: 'zIiRtm1wEjZAIo0mocLJgwS1BW',
        database: 'dbcmdkn560q5j',
        charset: 'utf8'
    }
});

knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email', 128);
    table.string('password');
    table.timestamps();
}).createTableIfNotExists('roles', function(table) {
    table.increments('id').primary();
    table.string('name');
}).createTableIfNotExists('roles_users', function(table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('role_id');
}).createTableIfNotExists('product', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.decimal('price', 10, 2);
    table.timestamps();
}).then(function() {});

var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;