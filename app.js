let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override');

let bodyParser = require("body-parser");
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let mongoose = require('mongoose');
const webpush = require("web-push");



let app = express();

let config = require('./server/config');

mongoose.connect(config.mongoURI.database,{ useUnifiedTopology: true,useNewUrlParser: true },(err,res)=>{
if(err){
  console.log('database could not be connect.');
} else {
  console.log('database connected');
}
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Set static path
app.use(express.static(path.join(__dirname, "views")));

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
