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
        charset: 'utf8',
        port: '5432'
    }
});

knex.schema.hasTable('users').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('users', function (table) {
            table.string('name');
            table.string('email');
            table.string('password');
            table.increments('id').primary();
        });
});

knex.schema.hasTable('roles').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('roles', function (table) {
            table.string('name');
            table.increments('id').primary();
        });
     else 
         return knex('roles').truncate().insert({name: 'user'});
});

knex.schema.hasTable('roles_users').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('roles_users', function (table) {
            table.increments('id').primary();
            table.integer('user_id').references('users.id');
            table.integer('role_id').references('roles.id');
        });
});


knex.schema.hasTable('orders').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('orders', function (table) {
            table.increments('id').primary();
            table.integer('user_id').references('users.id');
            table.timestamps();
        });
});

knex.schema.hasTable('products').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('products', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.integer('price');
            table.integer('number');
            table.string('unit');
            table.timestamps();
        });
});


knex.schema.hasTable('orders_products').then(function(existed) {
    if(!existed)
        return knex.schema.createTable('orders_products', function (table) {
            table.increments('id').primary();
            table.integer('order_id').references('orders.id');
            table.integer('product_id').references('products.id');
            table.integer('number');
            table.timestamps();
        });
});

var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;