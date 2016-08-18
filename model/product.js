'use strict'

let Bookshelf = require('./database');

var product = Bookshelf.Model.extends({
    tableName: 'product'
})

module.exports = Bookshelf.model('Product', product);