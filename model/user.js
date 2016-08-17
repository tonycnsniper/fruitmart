'use strict'

let Bookshelf = require('./database');

class user extends Bookshelf.Model {
    get tableName() {
        return 'users';
    }
}

module.exports = Bookshelf.model('User', user);