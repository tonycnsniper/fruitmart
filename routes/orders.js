var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');
var OrderList = require('../model/orderlist');


exports.list = function(req, res, next) {
    User.where({ name: req.session.user })
        .fetch({ withRelated: ['shoppingOrder', 'shoppingOrder.orderlist', 'shoppingOrder.products'] })
        .then(function(user) {
            var orders = user.related('shoppingOrder').find(function(order) {return order });
            var products = orders.related('products').models;
            var productsNumber = orders.related('orderlist').models;
            var resultList = [];
            products.forEach(function(product) {
                var resultProduct = productsNumber.find(function(item) {item.get('product_id') == product.get('id')});
                if (resultProduct != null) {
                    resultList.push({
                        name: product.get('name'),
                        price: product.get('price'),
                        number: resultProduct.get('number'),
                        value: product.get('price') * resultProduct.get('number'),
                        created_at: resultProduct.get('created_at').toISOString().replace('T', ' ').replace('.000Z', '')
                    })
                }
            })
            resultList.forEach( function(item, index) {item.id = (index + 1)});
            var totalNum = resultList.map(function(item) {return item.number}).length > 0 ?
                resultList.map(function(item) {return item.number}).reduce(function(a, b) {return a + b === undefined ? 0 : a + b }) : 0;
            var totalAccount = resultList.map(function(item) { return item.value}).length > 0 ?
                resultList.map(function(item) {return item.value }).reduce(function(a, b) {return a + b === undefined ? 0 : a + b }) : 0;
            resultList.push({
                id: '',
                name: 'Total',
                price: '',
                number: totalNum,
                value: totalAccount,
                created_at: ''
            });
            res.render('order', {
                title: 'Fruitmart - Order Details',
                products: resultList,
                username: req.session.user
            })
        })
}


exports.count = function(req, res, next) {
    User.query({ where: { name: req.session.user } })
        .fetch({ withRelated: ['shoppingOrder', 'shoppingOrder.orderlist'], require: true })
        .then(function(user) {
            var orders = user.related('shoppingOrder').models;
            if (orders.length === 0) {
                return res.send("0");
            } else {
                var order = orders.find(function(order) { return order });
                var lists = order.related('orderlist').models;
                var listCount = lists.map(function(list) {return list.get('number')}).reduce(function(a, b) {return a + b === undefined ? 0 : a + b })
                return res.send(listCount.toString());
            }
        });
}

exports.update = function(req, res, next) {
    var productId = req.params.id;
    User.query({ where: { name: req.session.user } })
        .fetch({ withRelated: ['shoppingOrder'], require: true })
        .then(function(user) {
            var orders = user.related('shoppingOrder').models;
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
                var order = orders.find(function(order) { return order});
                OrderList.query({ where: { order_id: order.get('id'), product_id: productId } })
                    .fetch()
                    .then(function(list) {
                        if (list == null) {
                            new OrderList({ order_id: order.get('id'), product_id: productId, number: 1 })
                                .save()
                                .then(function(newlist) {
                                    return res.send('SUCCESS');
                                })
                        } else {
                            new OrderList({ id: list.get('id'), order_id: order.get('id'), product_id: productId })
                                .save({ number: list.get('number') + 1 }, { patch: true })
                                .then(function(newlist) {
                                    return res.send('SUCCESS');
                                })
                        }
                    })
            }
        }).catch(function(err) {
            res.send('ERROR');
        })
}