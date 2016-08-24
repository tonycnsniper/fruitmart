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
            var role = user.related('roles').models.find(role => role);
            var roleName = role.get('name');
            if (user.verifyPassword(req.body.password)) {
                res.render('saleAdmin', {
                    title: "Welcome " + user.name,
                    products: []
                });
                req.session.user = user;
                req.session.admin = roleId;
            } else {
                res.send(401);
            }
        }).catch(function(err) {
            res.send(err);
            next();
        });

}