var express = require('express');
var router = express.Router();
const yaml = require('node-yaml');
const fs = require('fs');
var bodyParser = require('body-parser')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var routes = yaml.readSync("routes.yaml")
  
  var routers = fs.readdirSync("./routes", {withFileTypes: true})
  console.log(routers)
  // dirent.isFile()
  
  
  console.log(req.originalUrl + " needs to be assigned")
  
  res.render('admin/new-route', { title: req.originalUrl, routes: routes, routers: routers});
  // res.send('this is the router for a route to be assigned');
});

router.post('/link', function(req, res, next) {
  console.log("linking " + req.body.route + ' → ' + req.body.router)
  var routes = yaml.readSync("routes.yaml")
  
  routes[req.body.route] = req.body.router.split('.js')[0]
  
  console.log(routes)
  
  yaml.writeSync("routes.yaml", routes)
  res.send("🆗")
})

module.exports = router;
