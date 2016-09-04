'use strict'

var Bookshelf = require('./database');
var Product = require('./product');
var Order = require('./order');

var orderList = Bookshelf.Model.extend({
    tableName: 'orders_products',
    hasTimestamps: true,

    orders: function() {
        return this.belongsTo(Order);
    },
    products: function() {
        return this.belongsTo(Product);
    }
});

module.exports = Bookshelf.model('OrderList', orderList);