var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var nazoRouter = require('./routes/nazo');
var adminRouter = require('./routes/admin');
var ponpon_seRouter = require('./routes/ponpon_se');
var flg_changeRouter = require('./routes/flg_change');

var app = express();

//画面遷移許可の変数
app.set('start_to_1st_flg', 0);
app.set('1st_to_2nd_flg', 0);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/nazo', nazoRouter);
app.use('/ponpon_se', ponpon_seRouter);
app.use('/admin', adminRouter);
app.use('/flg_change', flg_changeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
