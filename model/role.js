'use strict'

let Bookshelf = require('./database');
let Users = require('./user');


let role = Bookshelf.Model.extends({
    tableName: 'roles',
    users: function() {
        return this.hasMany(Users);
    }
})

module.exports = Bookshelf.model('Role', role);