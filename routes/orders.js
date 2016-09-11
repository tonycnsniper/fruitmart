var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');
var OrderList = require('../model/orderlist');


exports.list = function(req, res, next) {
    User.where({ name: req.session.user })
        .fetch({ withRelated: ['shoppingOrder', 'shoppingOrder.orderlist', 'shoppingOrder.products'] })
        .then(user => {
            let orders = user.related('shoppingOrder').find(order => order);
            let products = orders.related('products').models;
            let productsNumber = orders.related('orderlist').models;
            let resultList = [];
            products.forEach(product => {
                let resultProduct = productsNumber.find(item => item.get('product_id') == product.get('id'));
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
            resultList.forEach((item, index) => item.id = (index + 1));
            let totalNum = resultList.map(item => item.number).length > 0 ?
                resultList.map(item => item.number).reduce((a, b) => a + b, 0) : 0;
            let totalAccount = resultList.map(item => item.value).length > 0 ?
                resultList.map(item => item.value).reduce((a, b) => a + b, 0) : 0;
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