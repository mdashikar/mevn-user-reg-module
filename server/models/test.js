//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    email: String,
    password: Number
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

module.exports = SomeModel;