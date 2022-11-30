let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let Post = require('../models/blog') // connect with blog model
let bodyParser = require('body-parser');
let fs = require('fs');
let multer = require('multer');
let path = require('path');

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
            })
            console.log(postlist);
        }
    }).sort({"postDate":-1});
}

module.exports.displayNewPost = (req, res, next)=>{ //make the function public within a module
    res.render('blog/add',{title: 'New Post'}) //render blog addition view
}

module.exports.processNewPost = (req, res, next)=>{ //make the function public within a module
    let newPost = Post ({
        "username":"Richard Astley",
        "title":req.body.title,
        "category":req.body.category,
        "text_content":req.body.text_content,
        "photo_content":req.body.photo_content,
        "pfp":"rick.webp",
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
            res.render('blog/update',{title:'Update Post', blog:postToEdit}) //render the uppdate view with parameters filled in for the blog to edit
        }
    })
}

module.exports.processPostUpdates = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id; //grab the selected post's id
    let updatePost = Post({ //retrieve changes to apply the post, ID is preset.
        "_id":id,
        "title":req.body.title,
        "category":req.body.category,
        "text_content":req.body.text_content,
        "postDate": new Date(),
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
    Post.find((err, postlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('blog/profile',{
                title: 'My Profile', 
                Postlist: postlist, //forward the blog database as an array
            })
            console.log(postlist);
        }
    }).sort({"postDate":-1});
}


module.exports.likePost = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id; //grab the selected post's id
    let counter = req.body.likes; //grab the selected post's id

}
    //WIP LIKE FEATURE
   /* Post.findById(id,(err,postToLike) => {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else //redirect to the list page now that we have updated the blog the database
        {
            let updateLike = Post ({ //retrieve changes to apply the post, ID is preset.
                "_id":postToLike.id,
                "likes": counter+1,
            });
            Post.updateOne({_id:id}, updateLike, (err) => {
                if(err)
                {
                    console.log(err)
                    res.end(err)
                }
                else //redirect to the list page now that we have updated the blog the database
                {
                    res.redirect('/blog-feed') //go back to blog list view
                }
            })    
        }})} */
