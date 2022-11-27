let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let multer = require('multer');

//Nate Coolidge - 100749708


// StackOverflow - set up multer for storing uploaded files

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname+'/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.png');
	}
});

var upload = multer({storage: storage,
    onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
    },
});


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



// Get to perform read operations

router.get('/delete/:id', blogController.deletePost);


module.exports=router; //declare as a router, make all functions public
