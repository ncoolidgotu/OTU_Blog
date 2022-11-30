var express = require('express');
var router = express.Router();

/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router; //declare as a router, make all functions public
