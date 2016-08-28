/*export users*/
var User = require('../model/user');
var Role = require('../model/role');
exports.list = function(req, res, next) {

};

exports.sign = function(req, res, next) {
    res.render('signup', {
        title: 'FruitMart - Registration'
    });
}

exports.signin = function(req, res, next) {
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    new Role({ name: 'user' })
        .fetch().then(function(role) {
            var user = new User({ name: name, email: email, password: password });
            if (user.isNew() === true) {
                user.save({ name: name, email: email, password: password }).then(function(user) {
                    user.getRoles().attach(role.get('id'));
                    res.redirect('/login');
                }).catch(function(error) {
                    next();
                })
            }
        })
}

exports.login = function(req, res, next) {
    res.render('login', {
        title: 'FruitMart - Log in'
    });
}

exports.admin = function(req, res, next) {
    res.render('saleAdmin', {
        title: req.session.admin,
        username: req.session.user
    })
}

exports.authentication = function(req, res, next) {
    var email = req.body.username;
    var password = req.body.password;

    new User({ email: email })
        //.fetch()
        .fetch({ withRelated: ['getRoles'] })
        .then(function(user) {
            var role = user.related('getRoles').models.find(role => role);
            var roleName = role.get('name');
            if (user.verifyPassword(req.body.password)) {
                req.session.user = user.get('name');
                req.session.admin = roleName;
                res.redirect('/admin');
            } else {
                res.send(401);
            }
        }).catch(function(err) {
            res.send(err);
            next();
        });

}