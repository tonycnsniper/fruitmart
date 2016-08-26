let Product = require('../model/product');

exports.add = function(req, res, next) {
    let productName = req.body.name;
    let price = req.body.price;

    new Product({ name: productName, price: price }).save().then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next();
    })
}