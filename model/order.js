'use strict'

var Bookshelf = require('./database');
var User = require('./user');
var Product = require('./product');

var order = Bookshelf.Model.extend({
    tableName: 'orders',
    users: function() {
        return this.belongsTo(User);
    },
    products: function() {
        return this.belongsToMany(Product);
    }

});

module.exports = Bookshelf.model('Order', order);