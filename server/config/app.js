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
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let localStrategy = passportLocal.Strategy;
let facebookStrategy = require('passport-facebook').Strategy;
let googleStrategy = require('passport-google-oauth2').Strategy;
let githubStrategy = require('passport-github2').Strategy;
let flash = require('connect-flash');
let crypto = require("crypto");
let app = express();


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


/*let jwtoptions = {};
jwtoptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtoptions.secretOrKey = DB.secret;

passport.use(new JWTStrategy(jwtoptions,(jwt_payload,done)=>{
  User.findById(jwt_payload.id, (err, user) => {
    if (err) return done(err, false);
    return done(null, user);
  });
}));*/


// Configure the Facebook strategy for use by Passport.
passport.use(new facebookStrategy({ //This is class constructor argument telling Passport to create a new Facebook Auth Strategy
  clientID: '867795580935966', //The App ID generated when app was created on https://developers.facebook.com/
  clientSecret:'4aa20c26d595af412a3f9bf8661223ee',//The App Secret generated when app was created on https://developers.facebook.com/
  callbackURL: 'https://otublog.coolidge.ml/facebook/callback', 
  profileFields: ['id', 'displayName', 'email', 'picture.type(large)'] // You have the option to specify the profile objects you want returned
  },

function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  process.nextTick(function() { //keep event in queue
    // find the user in the database based on their facebook id
    User.findOne({ 'username' :profile.id }, function(err, user) {
    //if there is an error, stop everything and return that
    // ie an error connecting to the database
    if (err)
        return done(err);


    // if the user is found, then log them in
    if (user) {
        console.log("user found")
        console.log(user)
    return done (null, user); // user found, return that user
    } 
    
    else 
    { 
    // if there is no user found with that facebook id, create them
    var newUser = new User();

      //set all of the facebook information in our user model
      newUser.username = profile.id; // set the users facebook id
      //newUser.token = token; // we will save the token that facebook provi
      newUser.displayName = profile.displayName
      newUser.email = profile.emails[0].value
      newUser.pfp = profile.photos[0].value //save our user to the database
      newUser.bio = 'Hi, Im from facebook :)'
      newUser.password = crypto.randomBytes(20).toString('hex');
      //newUser.created = "" 
      //newUser.update = ""


    newUser.save(function (err){
        if (err)
            throw err;
        return done(null, newUser);

                });
              }
          });
      });
    }
));

// Configure the Facebook strategy for use by Passport.
passport.use(new githubStrategy({ //This is class constructor argument telling Passport to create a new Facebook Auth Strategy
  clientID: '2f99e48e3549fd3a6a7d', //The App ID generated when app was created on https://developers.facebook.com/
  clientSecret:'1f4ceff622834996e33b63f3f3a56df1fd0a224b',//The App Secret generated when app was created on https://developers.facebook.com/
  callbackURL: 'https://otublog.coolidge.ml/github/callback', 

  },

function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  process.nextTick(function() { //keep event in queue
    // find the user in the database based on their facebook id
    User.findOne({ 'username' :profile.id }, function(err, user) {
    //if there is an error, stop everything and return that
    // ie an error connecting to the database
    if (err)
        return done(err);


    // if the user is found, then log them in
    if (user) {
        console.log("user found")
        console.log(user)
    return done (null, user); // user found, return that user
    } 
    
    else 
    { 
    // if there is no user found with that facebook id, create them
    var newUser = new User();

      //set all of the facebook information in our user model
      newUser.username = profile.id; // set the users facebook id
      //newUser.token = token; // we will save the token that facebook provi
      newUser.displayName = profile.username
      newUser.email = "dummy@email.com"
      newUser.pfp = profile.photos[0].value //save our user to the database
      newUser.bio = 'Hi, Im from github :)'
      newUser.password = crypto.randomBytes(20).toString('hex');
      //newUser.created = "" 
      //newUser.update = ""


    newUser.save(function (err){
        if (err)
            throw err;
        return done(null, newUser);

                });
              }
          });
      });
    }
));


passport.use(new googleStrategy({ //This is class constructor argument telling Passport to create a new Facebook Auth Strategy
  clientID: '556882229882-m6n55f1alg0umio5fsl8aeh9374gdh6g.apps.googleusercontent.com', //The App ID generated when app was created on google developer console
  clientSecret:'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',//The App Secret generated when app was created on google developer console
  callbackURL: 'https://otublog.coolidge.ml/google/callback',

  },

function(request, accessToken, refreshToken, profile, done) {
  console.log(profile)
  process.nextTick(function() { //keep event in queue
    // find the user in the database based on their facebook id
    User.findOne({ 'username' :profile.id }, function(err, user) {
    //if there is an error, stop everything and return that
    // ie an error connecting to the database
    if (err)
        return done(err);
    // if the user is found, then log them in
    if (user) {
        console.log("user found")
        console.log(user)
    return done (null, user); // user found, return that user
    } 
    
    else 
    { 
    // if there is no user found with that facebook id, create them
    let verysecurepassword = crypto.randomBytes(20).toString('hex')
    var newUser = new User();

      //set all of the facebook information in our user model
      newUser.username = profile.id; // set the users facebook id
      //newUser.token = token; // we will save the token that facebook provi
      newUser.displayName = profile.displayName
      newUser.email = profile.email
      newUser.pfp = profile.photos[0].value //save our user to the database
      newUser.bio = 'Hi, Im from google :)'
      newUser.password = verysecurepassword
      //newUser.created = "" 
      //newUser.update = ""


    newUser.save(function (err){
        if (err)
            throw err;
            return done(null, newUser);
                });
              }
          });
        });
}));


//serialize and deserialize the user information
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
//User.findById(id,function(err,user)){
//

passport.serializeUser (function (user, done) {
  done (null, user);
});

passport. deserializeUser (function (id, done) {
    User.findById(id,function(err,user){
      done(err,user);
    });
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
