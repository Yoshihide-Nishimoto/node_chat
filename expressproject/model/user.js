var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name:  String,
    email: String,
    password: String,
    created_at: String
});

exports.User = mongoose.model('User',User);