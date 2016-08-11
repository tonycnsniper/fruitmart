'use strict'

let Bookshelf = require('./database');

class product extends Bookshelf.Model {
    get tableName() {
        return 'product';
    }
}

module.exports = Bookshelf.model('Product', product);