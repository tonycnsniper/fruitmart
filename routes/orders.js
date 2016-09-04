var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');
var OrderList = require('../model/orderlist');

exports.count = function(req, res, next) {
    User.query({ where: { name: req.session.user } })
        .fetch({ withRelated: ['shoppingOrder', 'shoppingOrder.orderlist'], require: true })
        .then(user => {
            let orders = user.related('shoppingOrder').models;
            if (orders.length === 0) {
                return res.send("0");
            } else {
                let order = orders.find(order => order);
                let lists = order.related('orderlist').models;
                var listCount = lists.map(list => list.get('number')).reduce((a, b) => a + b, 0)
                return res.send(listCount.toString());
            }
        });
}

exports.update = function(req, res, next) {
    let productId = req.params.id;
    User.query({ where: { name: req.session.user } })
        .fetch({ withRelated: ['shoppingOrder'], require: true })
        .then(function(user) {
            let orders = user.related('shoppingOrder').models;
            if (orders.length == 0) {
                var order = new Order({ user_id: user.get('id') })
                    .save()
                    .then(function(order) {
                        new OrderList({ order_id: order.get('id'), product_id: productId, number: 1 })
                            .save().then(function(list) {
                                return res.send('SUCCESS');
                            })
                    });
            } else {
                let order = orders.find(order => order);
                OrderList.query({ where: { order_id: order.get('id'), product_id: productId } })
                    .fetch()
                    .then(list => {
                        if (list == null) {
                            new OrderList({ order_id: order.get('id'), product_id: productId, number: 1 })
                                .save()
                                .then(newlist => {
                                    return res.send('SUCCESS');
                                })
                        } else {
                            new OrderList({ id: list.get('id'), order_id: order.get('id'), product_id: productId })
                                .save({ number: list.get('number') + 1 }, { patch: true })
                                .then(newlist => {
                                    return res.send('SUCCESS');
                                })
                        }
                    })
            }
        }).catch(function(err) {
            res.send('ERROR');
        })
}