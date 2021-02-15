var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger =require('morgan');
var { Liquid } = require('liquidjs');
var engine = new Liquid();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var albumsRouter = require('./routes/albums');
var eventRouter = require('./routes/event');
var blogRouter = require('./routes/blog');
var contactRouter = require('./routes/contact');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var cartRouter = require('./routes/cart');

var app = express();

// view engine setup

app.engine('liquid', engine.express()); 
app.set('views', path.join(__dirname, 'views'));          // specify the views directory
app.set('view engine', 'liquid');       // set liquid to default


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/albums-store', albumsRouter);
app.use('/event', eventRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
