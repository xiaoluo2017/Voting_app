var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var findPolls = require('./routes/findPolls');
var findMyPolls = require('./routes/findMyPolls');
var updateVote = require('./routes/updateVote');
var insertPoll = require('./routes/insertPoll');
var findPollById = require('./routes/findPollById');
var checkUser = require('./routes/checkUser');
var insertUser = require('./routes/insertUser');
var deletePoll = require('./routes/deletePoll');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/findPolls', findPolls);
app.use('/findMyPolls', findMyPolls);
app.use('/updateVote', updateVote);
app.use('/insertPoll', insertPoll);
app.use('/findPollById', findPollById);
app.use('/checkUser', checkUser);
app.use('/insertUser', insertUser);
app.use('/deletePoll', deletePoll);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
