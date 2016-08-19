'use strict'

let Bookshelf = require('./database');
let Roles = require('./role');

let user = Bookshelf.Model.extends({
    tableName: 'users',
    roles: function() {
        return this.hasMany(Roles)
    }
});

module.exports = Bookshelf.model('User', user);