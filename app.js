var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
var bodyParser = require('body-parser')


const yaml = require('node-yaml');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))


console.log("loading routers:")
// if there's no defined router, we'll use the new-router to allow admin to assign a router to the route
var fallbackRouter = require('./admin/new-route.js');

var routes = yaml.readSync("./admin/routes.yaml")

for (var path in routes) {
      var routerName = '';

      if (routes[path] != null) {
        routerName = routes[path];
      } else {
        routerName = path.split('/')[1];
      }
   try {
      if (fs.existsSync('./routes/' + routerName + '.js')) {
        console.log(path + " → " + routerName)
        console.log(routerName + ' router exists')

        var router = require('./routes/' +  routerName);

      } else {throw 'no router'}
    } catch(err) {
      console.log(path + " → <to be defined>")
      console.warn(err + ': ' + routerName +  ' router doesn\'t exist')
      router = fallbackRouter;
    }
  
  app.use(path, router);
}

// admin/internal routes 
// 🚨 I don't advise editing this 🚨

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
