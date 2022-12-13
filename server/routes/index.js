/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

var express = require('express');
var router = express.Router();
let indexController = require("../controller/home"); //access index controller module
let multer = require('multer');

let upload= multer({dest:'./public/Assets/images/userUploads'})
// connect with blog model

function requireAuth(req,res,next)
{
	if(!req.isAuthenticated())
	{
		return res.redirect('/login');
	}
	next();
}

/* GET home page. */
router.get('/', indexController.displayHomepage); //retrieve index view from indexController

/* GET home page. */
router.get('/home', indexController.displayHomepage); //retrieve index view from indexController

/* GET login page. */
router.get('/login', indexController.displayLoginPage); //retrieve index view from indexController

router.get('/auth/facebook', indexController.facebookAuth); //retrieve index view from indexController

router.get('/facebook/callback', indexController.facebookCallback)

router.get('/auth/google', indexController.googleAuth); //retrieve index view from indexController

router.get('/google/callback', indexController.googleCallback)

/* POST login page. */
router.post('/login', indexController.processLoginPage); //retrieve index view from indexController

/* GET login page. */
router.get('/register', indexController.displayRegisterPage); //retrieve index view from indexController

/* POST login page. */
router.post('/register',upload.single('pfp'),indexController.processRegisterPage); //retrieve index view from indexController

/* Get logout page */
router.get('/logout', indexController.performLogout); //retrieve index view from indexController

/* Get Edit Page */
router.get('/editprofile/:id', indexController.displayEditPage); //retrieve edit view from indexController

/* Post Edit Page */
router.post('/editprofile/:id', indexController.processEditPage); //retrieve edot view from indexController

/* Get Edit Page */
router.get('/editpfp/:id', indexController.displayEditPfP); //retrieve edit view from indexController

/* Post Edit Page */
router.post('/editpfp/:id',upload.single('pfp'),indexController.processEditPfP); //retrieve edot view from indexController

module.exports = router; //declare as a router, make all functions public