/*export users*/
var User = require('../model/user');
var Role = require('../model/role');

exports.logout = function(req, res, next) {
    if (req.session !== null)
        req.session.destroy();
    res.redirect('/');
}

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
            new User({ name: name, email: email, password: password })
                .fetch()
                .then(function(user) {
                    if (user == null) {
                        new User({ name: name, email: email, password: password }).save().then(function(user) {
                            user.getRoles().attach(role.get('id'));
                            res.redirect('/login');
                        })
                    } else {
                        user.getRoles().attach(role.get('id'));
                        res.redirect('/login');
                    }
                })
                .catch(function(error) {
                    next();
                });
        })
}

exports.login = function(req, res, next) {
    res.render('login', {
        title: 'FruitMart - Log in'
    });
}

exports.authentication = function(req, res, next) {
    var email = req.body.username;
    var password = req.body.password;

    User.query({ where: { email: email } })
        .fetch({ withRelated: ['getRoles'] })
        .then(function(user) {
            var role = user.related('getRoles').models.find(function(role ) {return role});
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