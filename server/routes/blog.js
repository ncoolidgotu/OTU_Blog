let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
//Nate Coolidge - 100749708

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

router.post('/add', blogController.processNewPost);


// Update operation

// Get route for displaying the update page
router.get('/update/:id', blogController.displayUpdatePage);

// Post route for processing the update page

router.post('/update/:id', blogController.processPostUpdates);



// Get to perform read operations

router.get('/delete/:id', blogController.deletePost);




module.exports=router; //declare as a router, make all functions public
