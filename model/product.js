'use strict'

var Bookshelf = require('./database');

var product = Bookshelf.Model.extend({
    tableName: 'products'
})

module.exports = Bookshelf.model('Product', product);