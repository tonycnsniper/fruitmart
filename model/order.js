'use strict'

var Bookshelf = require('./database');
var User = require('./user');
var Product = require('./product');
var OrderList = require('./orderlist');

var order = Bookshelf.Model.extend({
    tableName: 'orders',
    hasTimestamps: true,
    user: function() {
        return this.belongsTo(User);
    },
    products: function() {
        return this.belongsToMany(Product).through(OrderList);
    },
    orderlist: function() {
        return this.hasMany(OrderList);
    }
});

module.exports = Bookshelf.model('Order', order);