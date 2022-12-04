let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library
let passport = require('passport');

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
            displayName: req.user ? req.user.displayName: ''
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
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email:req.body.email,
        displayName:req.body.displayName
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