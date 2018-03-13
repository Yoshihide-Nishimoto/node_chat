var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
    title:  String,
    author: String,
    content: String,
    created_at: String,
    updated_at: String
});

exports.Blog = mongoose.model('Blog',Blog);