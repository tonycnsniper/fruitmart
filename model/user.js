'use strict'

let Bookshelf = require('./database');
let Role = require('./role');

let user = Bookshelf.Model.extend({
    tableName: 'users',

    verifyPassword: function(password) {
        return this.get('password') === password;
    },

    roles: function() {
        return this.belongsToMany(Role)
    }
});

module.exports = Bookshelf.model('User', user);