'use strict'

var Bookshelf = require('./database');
var Role = require('./role');

var user = Bookshelf.Model.extend({
    tableName: 'users',

    verifyPassword: function(password) {
        return this.get('password') === password;
    },

    getRoles: function() {
        return this.belongsToMany(Role)
    }
});

module.exports = Bookshelf.model('User', user);