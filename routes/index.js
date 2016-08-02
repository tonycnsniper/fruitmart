exports.users = require('./users');

/* export index function */
exports.index = function(req, res, next) {
  res.render('index', { title: 'FruitMart - Enjoy fresh' });
};
