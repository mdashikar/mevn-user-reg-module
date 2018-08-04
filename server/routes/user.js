// load up the user model
var User = require('../models/user');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

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
                return res.send(user);
            });
        })(req, res, next);
    });

    app.post('/signup', (req, res) => {

        User.findOne({ $or: [{ 'local.email': req.body.email }, { 'local.username': req.body.username }] }, function(err, user) {
            if (err) {
                return res.send(err);
            }
            if (user) {
                if (user.local.email == req.body.email) {
                    return res.send("This email is already taken.")
                }
                return res.send("This username is already taken.")

            } else {
                var userData = new User();
                var genStr = (+new Date).toString(36).slice(-10) + Math.random().toString(36).slice(-10);
                const saltRounds = 10;
                let hash = bcrypt.hashSync(genStr, saltRounds);
                let updateHash = hash.replace(/[/]/g, '');
                const link = 'http://localhost:8080/verify/' + updateHash;

                userData.local.name = req.body.name;
                userData.local.email = req.body.email;
                userData.local.username = req.body.username;
                userData.local.password = req.body.password;
                userData.local.verifyEmail = updateHash;


                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'md.arif.ask@gmail.com',
                        pass: 'Takemig33'
                    }
                });
                const mailOptions = {
                    from: 'support@mdashikar.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Please verify your email address', // Subject line
                    html: `<p>Please click the link below to verify your account</p><br> <a href="${link}">Verify me.</a>`

                    // plain text body
                };

                userData.save()
                    .then(item => {
                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err)
                                console.log(err)
                            else
                                res.send({
                                    success: true
                                })
                        });

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

    // verify email address
    app.post('/verify', (req, res) => {
        User.findOne({ 'local.verifyEmail': req.body.verifyEmail }, function(err, result) {
            if (err) {
                return res.send(err);
            }
            if (!result) {
                return res.send("Broken link");
            }

            result.local.isVerified = true;
            result.local.verifyEmail = undefined;

            result.save(function(err) {
                if (err) {
                    console.log(err)
                } else {

                    res.send({
                        validation: true,
                        email: result.local.email
                    })
                }

            });
        });
    });
    app.post('/reset', (req, res) => {
            User.findOne({ 'local.resetPassword': req.body.resetToken }, function(err, result) {
                if (err) {
                    return res.send(err);
                }
                if (!result) {
                    return res.send("Link Broken!!!");
                }

                result.local.password = req.body.newPassword;

                result.save(function(err) {
                    if (err) {
                        console.log(err)
                    } else {

                        res.send({
                            resetPassword: true
                        })
                    }

                });
            });
        })
        // reset password 
    app.post('/reset-password', (req, res) => {
        User.findOne({ $or: [{ 'local.email': req.body.findUser }, { 'local.username': req.body.findUser }] }, function(err, user) {
            if (err) {
                return res.send(err);
            }
            if (user) {
                var genStr = (+new Date).toString(36).slice(-10) + Math.random().toString(36).slice(-10);
                const saltRounds = 10;
                let hash = bcrypt.hashSync(genStr, saltRounds);
                let updateHash = hash.replace(/[/]/g, '');
                const link = 'http://localhost:8080/reset-password/' + updateHash;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'md.arif.ask@gmail.com',
                        pass: 'Takemig33'
                    }
                });
                const mailOptions = {
                    from: 'support@mdashikar.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Please reset your password', // Subject line
                    html: `<p>Please click the link below to reset your password</p><br> <a href="${link}">Reset Password</a>`

                    // plain text body
                };

                user.local.resetPassword = updateHash;
                user.save(function() {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send({
                            updateLink: 'sent'
                        })
                    }
                });
                transporter.sendMail(mailOptions, function(err, info) {
                    if (err)
                        console.log(err)
                    else
                        res.send({
                            success: true
                        })
                });

            } else {
                res.send('No user found!!!');
            }
        });
    });


    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/user', isLoggedIn, function(req, res) {
        // res.send({
        // 	user: req.user // get the user out of session and pass to template
        // })
        res.json(req.user);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.send({
            logedOut: true
        });
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send('/');
}