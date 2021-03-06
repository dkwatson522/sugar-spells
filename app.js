const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const passport = require('passport');
const {promisify} = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
//takes out ability to add queries to the query string
const mongoSanitize = require('express-mongo-sanitize');
require('./handlers/passport');
const helmet = require("helmet");


// Create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our ejs files
app.set('view engine', 'ejs');

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows us to override POST Method with PUT and DELETE
app.use(methodOverride("_method"));

// Exposes a bunch of methods for validating data.
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,

  saveUninitialized: false,
  secure: true,
  store: new MongoStore(
    {
      mongooseConnection: mongoose.connection,
      touchAfter: 24 * 60 * 60
    }
  )
}));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('error', 'Something went wrong'), to pass to next page
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  // console.log(req.query)
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  // res.locals.curretUser = req.user;
  res.locals.currentPath = req.path;
  next();
});

//Mongo Injection
app.use(mongoSanitize());

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Handle Routes
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);


//Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());


// done! we export it so we can start the site in start.js
module.exports = app;
