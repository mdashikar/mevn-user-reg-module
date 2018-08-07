const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const serveStatic = require('serve-static');
const config = require('./config/secret');
const history = require('connect-history-api-fallback')
var app = express();

const staticFileMiddleware = serveStatic(__dirname + '../../dist');
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);


mongoose.connect(config.database, function(err){
  if(err) console.log(err);
  console.log('Connected to DB');
})

app.use(cors({
  origin:['http://localhost:8080'],
  credentials: true // enable set cookie
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

// required for passport
require('./config/passport')(passport); // pass passport for configuration

// app.use(session({ 
//   secret: config.secret,
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  //store: sessionStore,
  secret: config.secret,
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

app.use(cookieParser(config.secret))
app.use(session(sessionOpts))

app.use(passport.initialize())
app.use(passport.session())

// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

//const testroutes = require('./routes/test');

require('./routes/user')(app, passport); // load our routes and pass in our app and fully configured passport

//app.use(testroutes);

const port = process.env.PORT || 5050;

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.send('error');
});
app.listen(port, () => {

    console.log( `Express server listening on port ${port}`);
})
