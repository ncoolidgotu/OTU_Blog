let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let multer = require('multer');

/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */


// StackOverflow - set up multer for storing uploaded files

/*let  = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname); //Ensure file has a unique name
	}
});

let upload = multer({dest: './public/Assets/images/userUploads'}); //Pass destination into multer function

*/
let upload= multer({dest:'./public/Assets/images/userUploads'})
// connect with blog model

let Post = require('../models/blog');

let blogController = require('../controller/blog');

function requireAuth(req,res,next)
{
	if(!req.isAuthenticated())
	{
		return res.redirect('/login');
	}
	next();
}

// Read Operation

// Get route for the blog posts feed

router.get('/', blogController.viewFeed);


// Create operation

// Get route for displaying the Add page
router.get('/add',requireAuth, blogController.displayNewPost);

// Post route for processing the Add page

router.post('/add',requireAuth, upload.single('photo_content'), blogController.processNewPost);


// Update operation

// Get route for displaying the update page
router.get('/update/:id', blogController.displayUpdatePage);

// Post route for processing the update page

router.post('/update/:id',requireAuth, blogController.processPostUpdates);



// Get to perform delete operations

router.get('/delete/:id',requireAuth, blogController.deletePost);

// Get to perform like post operations

router.post('/like/:id', blogController.likePost);


// Get operation to view profile
router.get('/profile', blogController.viewProfile);


module.exports=router; //declare as a router, make all functions public
