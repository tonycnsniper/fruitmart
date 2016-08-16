/*export users*/
exports.list = function(req, res, next) {

};

exports.login = function(req, res, next) {
    res.render('login', { title: 'FruitMart - Enjoy fresh' });
}

exports.authentication = function(req, res, next) {
    res.redirect('/');
}