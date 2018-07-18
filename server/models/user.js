// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {
            type: String,
            unique: true,
            trim: true
        },
        password     : String,
        name: String,
        username: {
            type: String,
            unique: true,
            trim: true
        }   
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this.local;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);