let createError = require('http-errors');
let express = require('express'); //import express module
let path = require('path'); //import paths
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let multer = require('multer');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();
let facebookStrategy = require('passport-facebook').Strategy;

/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

//create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

//config mongoDB
let mongoose = require('mongoose'); //library
let DB = require('./db'); //access db module which contains URI variable

//point mongoose to database uri
mongoose.connect(DB.URI); //specified in db.js
let mongoDB = mongoose.connection; //connect to mongoDB
mongoDB.on('error',console.error.bind(console, 'Connection Error:')); //If error, send message to console
mongoDB.once('open', ()=> {
  console.log('connected to mongoDB')
});

//Set-up Express Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))

//implement a User AUthentication
passport.use(User.createStrategy());


// Configure the Facebook strategy for use by Passport.
passport.use(new facebookStrategy({ //This is class constructor argument telling Passport to create a new Facebook Auth Strategy
  clientID: '867795580935966', //The App ID generated when app was created on https://developers.facebook.com/
  clientSecret:'4aa20c26d595af412a3f9bf8661223ee',//The App Secret generated when app was created on https://developers.facebook.com/
  callbackURL: 'https://otublog.coolidge.ml/facebook/callback', 
  profileFields: ['id', 'displayName', 'email'] // You have the option to specify the profile objects you want returned
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  return done(null,profile)
}
));

// serialize and deserialize the user information
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

passport.serializeUser (function (user, done) {
  done (null, user);
});

passport. deserializeUser (function (id, done) {
  return done (null, id)
});

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//initialize flash
app.use(flash());


let indexRouter = require('../routes/index'); //router for index page
let usersRouter = require('../routes/users'); //route for users, not in use right now
let blogRouter = require('../routes/blog'); //router for blog pages and actions


// view engine setup
app.set('views', path.join(__dirname, '../views')); //make this directry easily accessible
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); //make this directry easily accessible
app.use(express.static(path.join(__dirname, '../../node_modules'))); //make this directry easily accessible

app.use('/', indexRouter); // attach main page to index view
app.use('/users', usersRouter);
app.use('/blog-feed', blogRouter); //attach blogRouter to /blog-posts page

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error 404"});
});



module.exports = app; //export the configuration for public use
