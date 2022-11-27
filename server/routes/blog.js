let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
//Nate Coolidge - 100749708

//copying the vid guy:
//let multer = require('multer');
//image upload
/*
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./pathforimage/'); //upload image to this file
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname#+"_"+Date.now()+"_"+file.originalname); //cute way of naming the file
    },
});

let upload = multer({
    storage: storage;
}).single('photo_content'); //inside the brackets should be the id / name in .ejs
//single cause only uploading 1 img at a time
*/
//inster user into database

/*
router.post('/add', upload,(req,res)=>{
    const post = new Post({     //using the model
        title: req.body.title,
        category: req.body.category
        image: req.file.filename,
    });
    post.save((err)=>{
        if(err){
        }
        else{
            req.session.message
        }
    })
    //.save is mongoose             
})

*/

//
//
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
