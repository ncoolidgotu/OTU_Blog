//Nate Coolidge - 100749708

var express = require('express');
var router = express.Router();
let indexController = require("../controller/home"); //access index controller module


/* GET home page. */
router.get('/', indexController.displayHomepage); //retrieve index view from indexController

/* GET home page. */
router.get('/home', indexController.displayHomepage); //retrieve index view from indexController


module.exports = router; //declare as a router, make all functions public