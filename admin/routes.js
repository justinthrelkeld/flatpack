var express = require('express');
var router = express.Router();
const yaml = require('node-yaml');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // var routes = yaml.readSync("./admin/routes.yaml")
  res.send('this would be the routes');
});

module.exports = router;
