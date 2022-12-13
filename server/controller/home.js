let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let passport = require('passport');
let fs = require('fs');

let userModel = require('../models/user');
let User = userModel.User;

/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

module.exports.displayHomepage = (req, res, next)=>{ //make the function public within a module
    res.render('home',{
        title: 'Homepage',
        displayName: req.user ? req.user.displayName:''
    })
}

module.exports.displayLoginPage = (req, res,next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName:''
        })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',(err,user, info) =>
    {
        //server error
        if(err)
        {
            return next (err);
        }
        //is a login error
        if(!user)
        {
            req.flash('loginMessage','AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err)
            {
                return next(err)
            }
            return res.redirect('blog-feed');            
        })
    })(req, res, next)
}

module.exports.facebookCallback = passport.authenticate('facebook', {
    successRedirect:'/blog-feed',
    failedRedirect:'/auth/login',
})

module.exports.facebookAuth = passport.authenticate('facebook', {
    scope:'email'
})

module.exports.googleCallback = passport.authenticate('google', {
    successRedirect:'/blog-feed',
    failedRedirect:'/auth/login',
})

module.exports.googleAuth = passport.authenticate('google', {
    scope:['email', 'profile']
})

module.exports.displayRegisterPage = (req,res,next) =>{
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register', 
        {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processRegisterPage = (req,res,next) => {
    let filename = Date.now() + req.file.filename
    let photoPath = '/Assets/images/userUploads/'+filename
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email:req.body.email,
        pfp:photoPath,
        displayName:req.body.displayName,
        bio:req.body.bio
    })
    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.log("error: inserting the new user");
            if(err.name=="UserExistsError")
            {
                req.flash('registerMessage',
                'Registration Error: User Already Exists');
            }
        return res.render('auth/register',
            {
                title:'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:''
            });
        }
        else
        {
            // if registration is not successful
            return passport.authenticate('local')(req,res,()=>
            {
                res.redirect('blog-feed');
                fs.rename(req.file.path, './public/Assets/images/userUploads/' + filename, function(err){
                    if(err){
                        throw err;
                    }
                })
            })
            
        }
    })
}

module.exports.performLogout = (req,res,next)=>
{
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    res.redirect('/');
}

module.exports.displayEditPage = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id;
    User.findById(id,(err,editUser)=>{
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('auth/editprofile',{
                title:'Update User',
                user:editUser,
                displayName: req.user ? req.user.displayName:''
            }) //render the uppdate view with parameters filled in for the blog to edit
        }
    })
}

module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id; //grab the selected post's id
    let editUser = User({
        "_id":id,
        email:req.body.email,
        "pfp":req.user ? req.user.pfp:'',
        bio:req.body.bio,
        displayName:req.body.displayName
    })
    User.updateOne({_id:id}, editUser,(err) => { //post the changes
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else //redirect to the list page now that we have updated the blog the database
        {
            res.redirect('/blog-feed') //go back to blog list view
            console.log(editUser)
        }
    })
}

module.exports.displayEditPfP = (req, res, next)=>{ //make the function public within a module
    let id = req.params.id;
    User.findById(id,(err,editUser)=>{
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('auth/editpfp',{
                title:'Update User',
                user:editUser,
                displayName: req.user ? req.user.displayName:''
            }) //render the uppdate view with parameters filled in for the blog to edit
        }
    })
}

module.exports.processEditPfP = (req,res,next) => {
    let id = req.params.id; //grab the selected post's id
    let filename = Date.now() + req.file.filename
    let photoPath = '/Assets/images/userUploads/'+filename
    let editUser = User({
        "_id":id,
        "username": req.user ? req.user.username:'',
        "password": req.user ? req.user.password:'',
        "email":req.user ? req.user.email:'',
        "pfp":photoPath,
        "bio":req.user ? req.user.bio:'',
        "displayName":req.user ? req.user.displayName:''
    })
    User.updateOne({_id:id}, editUser,(err) => { //post the changes
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
            console.log(editUser)
        }
    })
}