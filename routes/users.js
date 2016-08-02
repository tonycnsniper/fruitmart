/*export users*/
exports.list = function(req, res, next) {
  res.render('index', { title: 'test' });
  res.redirect('/');
};
