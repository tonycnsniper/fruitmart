'use strict'

let Bookshelf = require('./database');
let User = require('./user');

let role = Bookshelf.Model.extend({
    tableName: 'ROLE',
    users: function() {
        return this.belongsToMany(User);
    }
});

module.exports = Bookshelf.model('Role', role);