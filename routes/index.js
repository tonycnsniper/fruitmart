/* export index function */
exports.index = function(req, res, next) {
    res.render('index', { title: 'FruitMart - Enjoy fresh' });
};

exports.users = require('./users');
exports.products = require('./products');