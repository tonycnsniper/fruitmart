'use strict'

let Bookshelf = require('./database');

class role extends Bookshelf.Model {
    get tableName() {
        return 'roles';
    }
}

module.exports = Bookshelf.model('Role', role);