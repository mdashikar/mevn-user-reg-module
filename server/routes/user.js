// load up the user model
var User = require('../models/user');

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	// section will be added soon

	// =====================================
	// LOGIN ===============================
	// =====================================


	app.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
		  if (err) { return next(err); }
		  if (!user) { return res.send(info.message); }
		  req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.send('Authencated success!!! Your username is ' + user.local.username);
		  });
		})(req, res, next);
	  });
	
	app.post('/signup', (req, res) => {

		User.findOne({ $or: [{'local.email': req.body.email},{'local.username': req.body.username}]}, function(err, user){
			if(err){
				return res.send(err);
			}
			if(user){
				if(user.local.email == req.body.email){
					return res.send("This email is already taken.")
				}
				return res.send("This username is already taken.")
				
			}
			else{
				var userData = new User();

				userData.local.name = req.body.name;
				userData.local.email = req.body.email;
				userData.local.username = req.body.username;
				userData.local.password = req.body.password;

				userData.save()
					.then(item => {
						res.send("item saved to database")
						// `req.user` contains the authenticated user.
						//res.redirect('/profile/' + req.body.username);
					})
					.catch(err => {
						console.log(err);
						res.status(400).send("unable to save to database");
					})

					}
				})
	
	})
  
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.send({
			user: req.user // get the user out of session and pass to template
		})
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.send('redirect');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}