var Product = require('../model/product');

exports.list = function(req, res, next) {
    Product.fetchAll()
        .then(function(list) {
            res.render('productList', {
                products: list.toJSON(),
                username: req.session.user
            })
        })
}

exports.admin = function(req, res, next) {
    Product.fetchAll()
        .then(function(products) {
            res.render('saleAdmin', {
                title: req.session.user,
                products: products.toJSON(),
                username: req.session.user
            });
        }).catch(function(error) {
            console.log(error);
            res.send('An error thrown out');
        })
}

exports.add = function(req, res, next) {
    var productName = req.body.name;
    var price = req.body.price;
    var invertory = req.body.invertory;

    if (req.session.productId != null) {
        new Product({ id: req.session.productId })
            .save({ name: productName, price: price, number: invertory }, { patch: true })
            .then(function(product) {
                res.redirect('/admin');
            }).catch(function(error) {
                res.redirect('/admin');
            });
    } else {
        new Product({ name: productName, price: price, number: invertory })
            .save()
            .then(function(product) {
                res.redirect('/admin');
            }).catch(function(error) {
                res.redirect('/admin');
            });
    }

}

exports.remove = function(req, res, next) {
    new Product({ id: req.params.id })
        .destroy({ require: true })
        .then(function() {
            res.redirect('/admin');
        }).catch(function(error) {
            res.redirect('/admin');
        });

}

exports.search = function(req, res, next) {
    Product.query({ where: { id: req.params.id } })
        .fetch()
        .then(function(product) {
            req.session.productId = req.params.id;
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