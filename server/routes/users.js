var express = require('express');
var router = express.Router();

//Nate Coolidge - 100749708

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router; //declare as a router, make all functions public
