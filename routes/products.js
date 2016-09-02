var Product = require('../model/product');

exports.add = function(req, res, next) {
    var productName = req.body.name;
    var price = req.body.price;
    var invertory = req.body.invertory;

    Product.query({ where: { name: productName } })
        .fetch()
        .then(function(product) {
            if (product == null) {
                new Product({ name: productName, price: price, number: invertory }).save().then(function() {
                    res.redirect('/');
                }).catch(function(error) {
                    next();
                })
            }
        })

}

exports.search = function(req, res, next) {
    Product.query({ where: { id: req.params.id } })
        .fetch()
        .then(function(product) {
            res.render('saleAdmin', {
                title: req.session.admin,
                username: req.session.user,
                product: product.toJSON()
            });
        }).catch(function(err) {
            res.send(err);
            next();
        });

}