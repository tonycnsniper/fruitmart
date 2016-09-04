exports.users = require('./users');
exports.products = require('./products');
exports.orders = require('./orders');

/* export index function */
exports.index = function(req, res, next) {
    res.render('index', {
        title: 'FruitMart - Enjoy fresh',
        username: req.session.user
    })
};