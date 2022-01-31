const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const helmet = require('helmet');

i18n.configure({
  locales: ['ar', 'en'],
  directory: __dirname + '/locales',
  defaultLocale: 'ar',
  updateFiles: false,
  // autoReload: true,
});

const logger = require('./libs/logger.js');
const pinoHttp = require('pino-http')({
  logger: logger,
  autoLogging: false,
});

const app = express();
app.use(helmet());
app.use(pinoHttp);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);

app.all('/*', function (req, res, next) {
  if (req.headers["lang"]) {
    i18n.setLocale(req.headers["lang"]);
  }
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});


// Dashboard APIs
app.use(require('./src/auth/auth_router'));
app.use(require('./src/user/support/user_router'));
app.use(require('./src/places/support/place_router'));
app.use(require('./src/recommended_places/support/recommended_places_router'));
app.use(require('./src/place_amenites/support/places_amenities_router'));
app.use(require('./src/place_image/place_image_router'));
app.use(require('./src/favorite_places/support/favorite_places_router'));

// User APIs
app.use(require('./src/user/user/user_router'));
app.use(require('./src/place_comment/place_comment_router'));
app.use(require('./src/place_comment/user_comments_router'));
app.use(require('./src/places/user/place_router'));
app.use(require('./src/favorite_places/user/favorite_places_router'));
app.use(require('./src/recommended_places/user/recommended_places_router'));
app.use(require('./src/place_amenites/user/places_amenities_router'));
app.use(require('./src/comment_likes/comments_likes_router'));

// error handlers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

module.exports = app;
