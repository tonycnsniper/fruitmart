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

Promise.all([
    knex.schema.dropTable('roles_users').then(function() {}),
    knex.schema.dropTable('users').then(function() {}),
    knex.schema.dropTable('roles').then(function() {}),
    knex.schema.dropTable('product').then(function() {}),
    knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email', 128);
        table.string('password');
        table.timestamps();
    }).then(function() {}),

    knex.schema.createTable('roles', function(table) {
        table.increments('id').primary();
        table.string('name');
    }).then(function() {
        knex('roles').insert({ name: 'admin' }).then(function() {});
        knex('roles').insert({ name: 'user' }).then(function() {});
    }),
    knex.schema.createTable('roles_users', function(table) {
        table.increments('id').primary();
        table.integer('user_id').references('users.id');
        table.integer('role_id').references('roles.id');
    }).then(function() {}),
    knex.schema.createTable('product', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.decimal('price', 10, 2);
        table.timestamps();
    }).then(function() {}),
]);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;