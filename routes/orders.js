var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');

exports.update = function(req, res, next) {
    let productId = req.params.id;
    User.query({ where: { name: req.session.user } })
        .fetch({ withRelated: ['shoppingOrder'] })
        .then(function(user) {
            let orders = user.related('shoppingOrder').model;
            if (orders.length == 0) {
                var order = new Order({ user_id: user.get('id') });
                order.save()
                order.users().attach(order.get('id'));
                order.products().attach(productId);
                return res.send('SUCCESS');
            } else {
                orders.products().attach(productId);
                return res.send('SUCCESS');
            }
        }).catch(function(err) {
            res.send('ERROR');
        })
}