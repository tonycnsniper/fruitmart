'use strict'

var Bookshelf = require('./database');
var Role = require('./role');
var Order = require('./order');

var user = Bookshelf.Model.extend({
    tableName: 'users',

    verifyPassword: function(password) {
        return this.get('password') === password;
    },

    getRoles: function() {
        return this.belongsToMany(Role)
    },

    shoppingOrder: function() {
        return this.hasMany(Order);
    }
});

module.exports = Bookshelf.model('User', user);