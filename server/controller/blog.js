let express = require('express'); //use express library

let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let Post = require('../models/blog') // connect with blog model
let bodyParser = require('body-parser');
let fs = require('fs');
let multer = require('multer');
let path = require('path');
let jwt = require('jsonwebtoken');

/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

module.exports.viewFeed = (req, res, next)=>{ //make the function public within a module
    Post.find((err, postlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('blog/feed',{
                title: 'My Feed', 
                Postlist: postlist, //forward the blog database as an array
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            })
            console.log(postlist);
        }
    }).sort({"postDate":-1});
}

module.exports.displayNewPost = (req, res, next)=>{ //make the function public within a module
    res.render('blog/add',{
        title: 'New Post',
        displayName: req.user ? req.user.displayName:''
    }) //render blog addition view
}

module.exports.processNewPost = (req, res, next)=>{ //make the function public within a module
    let filename = Date.now() + req.file.filename
    let photoPath = '/Assets/images/userUploads/'+filename
    let newPost = Post ({
        "username":req.user ? req.user.username:'',
        "displayName":req.user ? req.user.displayName:'',
        "title":req.body.title,
        "category":req.body.category,
        "text_content":req.body.text_content,
        "photo_content":photoPath,
        "pfp":req.user.pfp,
        "postDate": new Date(),
        "likes":0,
    });
    Post.create(newPost,(err, Post) => { //add the blog to the database based on above information specified
        if(err)
        {
            console.log(err)
            console.log(req.file)
            res.end(err) //end response, do not send any data
        }
        else //redirect to the list page now that we have added the blog into the database
        {
            res.redirect('/blog-feed') //go back to blog list view
            console.log(req.file)
            fs.rename(req.file.path, './public/Assets/images/userUploads/' + filename, function(err){
                if(err){
                    throw err;
                }
            })
        }
    })
}

module.exports.displayUpdatePage = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id;
    Post.findById(id,(err,postToEdit)=>{
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('blog/update',{
                title:'Update Post',
                blog:postToEdit,
                displayName: req.user ? req.user.displayName:''
            }) //render the uppdate view with parameters filled in for the blog to edit
        }
    })
}

module.exports.processPostUpdates = (req, res, next)=>{ //make the function public within a module
    let filename = Date.now() + req.file.filename
    let photoPath = '/Assets/images/userUploads/'+filename
    let id = req.params.id; //grab the selected post's id
    let updatePost = Post({ //retrieve changes to apply the post, ID is preset.
        "_id":id,
        "username":req.user ? req.user.username:'',
        "displayName":req.user ? req.user.displayName:'',
        "title":req.body.title,
        "category":req.body.category,
        "text_content":req.body.text_content,
        "postDate": new Date(),
        "photo_content":photoPath,
        "likes":0,
    });
    Post.updateOne({_id:id}, updatePost,(err) => { //post the changes
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else //redirect to the list page now that we have updated the blog the database
        {
            res.redirect('/blog-feed') //go back to blog list view
            fs.rename(req.file.path, './public/Assets/images/userUploads/' + filename, function(err){
                if(err){
                    throw err;
                }
            })
        }
    })
}

module.exports.deletePost = (req, res, next)=> { //make the function public within a module
    let id = req.params.id;
   Post.remove({_id:id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err); //end response, do not send any data
        }
        else //redirect to the list page now that we have deleted the blog from the database
        {
            res.redirect('/blog-feed/profile'); //go back to blog list view
        }
    })
}

module.exports.viewProfile = (req, res, next)=>{ //make the function public within a module
    Post.find({username:req.user ? req.user.username:''},(err, postlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('blog/profile',{
                title: 'My Profile', 
                Postlist: postlist, //forward the blog database as an array
                displayName: req.user ? req.user.displayName:'',
                pfp:req.user ? req.user.pfp:'',
                myId:req.user ? req.user._id:'',
                bio:req.user ? req.user.bio:'',
            })
            console.log(postlist);
        }
    }).sort({"postDate":-1});
}


module.exports.likePost = (req, res, next)=>{ //make the function public within a module
    Post.findById(req.params.id, function(err, postToLike){
        if(err){
            console.log(err);
        } else {
            postToLike.likes += 1;
            postToLike.save();
            console.log(postToLike.likes);
        }
    });
    res.redirect('/blog-feed')
};
