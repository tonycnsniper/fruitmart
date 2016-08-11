var Product = require('../model/product');

exports.list = function(req, res, next) {
    Product.fetchAll()
        .then(function(product) {
            res.send(product.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error thrown out');
        })
};