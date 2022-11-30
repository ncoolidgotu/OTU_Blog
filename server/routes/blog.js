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

let fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/Assets/images/userUploads'); //can't figure out file path -> should be assets/images/userUploads
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now());
	}
});

let upload = multer({storage: fileStorage}); //can't figure out file path


// connect with blog model

let Post = require('../models/blog');

let blogController = require('../controller/blog');


// Read Operation

// Get route for the blog posts feed

router.get('/', blogController.viewFeed);


// Create operation

// Get route for displaying the Add page
router.get('/add', blogController.displayNewPost);

// Post route for processing the Add page

router.post('/add', upload.single('photo_content'), blogController.processNewPost);


// Update operation

// Get route for displaying the update page
router.get('/update/:id', blogController.displayUpdatePage);

// Post route for processing the update page

router.post('/update/:id', blogController.processPostUpdates);



// Get to perform delete operations

router.get('/delete/:id', blogController.deletePost);

// Get to perform like post operations

router.post('/like/:id', blogController.likePost);


// Get operation to view profile
router.get('/profile', blogController.viewProfile);


module.exports=router; //declare as a router, make all functions public
