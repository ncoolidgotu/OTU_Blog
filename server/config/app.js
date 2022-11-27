let createError = require('http-errors');
let express = require('express'); //import express module
let path = require('path'); //import paths
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let fs = require('fs');
let multer = require('multer');

//Nate Coolidge - 100749708

//config mongoDB
let mongoose = require('mongoose'); //library
let DB = require('./db'); //access db module which contains URI variable

//point mongoose to database uri
mongoose.connect(DB.URI); //specified in db.js
let mongoDB = mongoose.connection; //connect to mongoDB
mongoDB.on('error',console.error.bind(console, 'Connection Error:')); //If error, send message to console
mongoDB.once('open', ()=> {
  console.log('connected to mongoDB')
})


let indexRouter = require('../routes/index'); //router for index page
let usersRouter = require('../routes/users'); //route for users, not in use right now
let blogRouter = require('../routes/blog'); //router for blog pages and actions

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views')); //make this directry easily accessible
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); //make this directry easily accessible
app.use(express.static(path.join(__dirname, '../../node_modules'))); //make this directry easily accessible
//app.use(express.static(path.join(__dirname, '../views')));

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



// StackOverflow - set up multer for storing uploaded files

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

let upload = multer({ storage: storage });



module.exports = app; //export the configuration for public use
