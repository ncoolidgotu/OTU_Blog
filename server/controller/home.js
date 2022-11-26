let express = require('express'); //use express library
let router = express.Router(); //create router
let mongoose = require('mongoose'); //use mongoose library

//Nate Coolidge - 100749708

module.exports.displayHomepage = (req, res, next)=>{ //make the function public within a module
    res.render('home',{title: 'Homepage'})
}

