const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const config = require('./config/secret');
var app = express();


mongoose.connect(config.database, function(err){
  if(err) console.log(err);
  console.log('Connected to DB');
})

app.use(cors())


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

// required for passport
require('./config/passport')(passport); // pass passport for configuration

app.use(session({ secret: config.secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const testroutes = require('./routes/test');

require('./routes/user')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(testroutes);

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
  res.render('error');
});
app.listen(port, () => {

    console.log( `Express server listening on port ${port}`);
})
