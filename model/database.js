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
knex.schema.dropTable('roles_users')
    .dropTable('roles')
    .dropTable('users').then(function() {});

knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email', 128);
    table.string('password');
    table.timestamps();
}).createTable('roles', function(table) {
    table.increments('id').primary();
    table.string('name');
}).createTable('roles_users', function(table) {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.integer('role_id').references('roles.id');
}).createTable('product', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.decimal('price', 10, 2);
    table.timestamps();
}).then(function() {});



var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;