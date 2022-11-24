let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let Asset = require('../models/blog') // connect with blog model

//Nate Coolidge - 100749708

module.exports.viewPost = (req, res, next)=>{ //make the function public within a module
    Post.find((err, postlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('blog/list',{
                title: 'View Post', 
                Postlist: postlist, //forward the blog database as an array
            })
            console.log(postlist);
        }
    });
}

module.exports.displayNewPost = (req, res, next)=>{ //make the function public within a module
    res.render('blog/add',{title: 'New Post'}) //render blog addition view
}

module.exports.processNewPost = (req, res, next)=>{ //make the function public within a module
    let newPost = Post ({
        "username":req.body.username,
        "title":req.body.title,
        "category":req.body.category,
        "description":req.body.description,
        "postDate":req.body.aquisitionDate,
        "likes":req.body.likes,
        "comments":req.body.comments,
    });
    Post.create(newPost,(err, Post) => { //add the blog to the database based on above information specified
        if(err)
        {
            console.log(err)
            res.end(err) //end response, do not send any data
        }
        else //redirect to the list page now that we have added the blog into the database
        {
            res.redirect('/blog-posts') //go back to blog list view
        }
    })
}

module.exports.displayUpdatePage = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id;
    Post.findById(id,(err,blogToEdit)=>{
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('blog/update',{title:'Update Post', blog:blogToEdit}) //render the uppdate view with parameters filled in for the blog to edit
        }
    })
}

module.exports.processPostUpdates = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id; //grab the selected post's id
    let updatePost = Post({ //retrieve changes to apply the post, ID is preset.
        "username":req.body.username,
        "title":req.body.title,
        "category":req.body.category,
        "description":req.body.description,
        "postDate":req.body.aquisitionDate,
        "likes":req.body.likes,
        "comments":req.body.comments,
    });
    Post.updateOne({_id:id}, updatePost,(err) => { //post the changes
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else //redirect to the list page now that we have updated the blog the database
        {
            res.redirect('/blog-list') //go back to blog list view
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
            res.redirect('/blog-list'); //go back to blog list view
        }
    })
}

