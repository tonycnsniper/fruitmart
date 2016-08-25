exports.users = require('./users');
exports.products = require('./products');
var Product = require('../model/product');

/* export index function */
exports.index = function(req, res, next) {
    Product.fetchAll()
        .then(function(products) {
            res.render('index', {
                title: 'FruitMart - Enjoy fresh',
                products: products.toJSON(),
                username: req.session.user
            });
        }).catch(function(error) {
            console.log(error);
            res.send('An error thrown out');
        })
};