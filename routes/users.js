/*export users*/
let User = require('../model/user');
let Role = require('../model/role');
exports.list = function(req, res, next) {

};

exports.login = function(req, res, next) {
    res.render('login', { title: 'FruitMart - Enjoy fresh' });
}

exports.authentication = function(req, res, next) {
    let userName = req.body.username;
    let password = req.body.password;

    let user = new User();
    user.query({ where: { name: req.body.username } })
        //.fetch()
        .fetch({ withRelated: ['roles'] })
        .then(function(user) {
            var status = user.verifyPassword(req.body.password);
            var roleName = user.related('roles').models.map(o => o.get('name')).find(o => o);
            if (status)
                res.render('index', {
                    title: "Welcome " + roleName,
                    products: []
                });
        }).catch(function(err) {
            res.send(err);
            next();
        });

}