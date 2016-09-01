var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.title = "Fruitmart - Enjoy fresh";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({ secret: '2C44774A-D649-4D44-9535-46E296EF984F' }));
app.use(cookieParser());
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    if (req.session && req.session.admin)
        res.locals.admin = true;
    next();
});


//Authorization
var authorize = function(req, res, next) {
    if (req.session && req.session.admin)
        return next();
    else
        return res.send(401);
}


app.get('/', routes.index);
app.get('/users', routes.users.list);

app.get('/login', routes.users.login);
app.post('/login', routes.users.authentication);

app.get('/signup', routes.users.sign);
app.post('/signup', routes.users.signin)

app.get('/admin', authorize, routes.users.admin);
app.post('/admin', authorize, routes.products.add);
//RESTFUL API explict
app.get('/api/search/:id', authorize, routes.products.search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.all('*', function(req, res) {
        res.send(404);
    })
    // development error handler
    // will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;