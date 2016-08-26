'use strict'

var Bookshelf = require('./database');
var User = require('./user');

var role = Bookshelf.Model.extend({
    tableName: 'roles',
    users: function() {
        return this.belongsToMany(User);
    }
});

module.exports = Bookshelf.model('Role', role);