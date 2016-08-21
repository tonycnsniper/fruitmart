'use strict'

let Bookshelf = require('./database');

var product = Bookshelf.Model.extend({
    tableName: 'product'
})

module.exports = Bookshelf.model('Product', product);