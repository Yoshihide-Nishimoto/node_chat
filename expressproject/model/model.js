var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
   title:  String,
   content: String,
   author: String,
   created_at: String,
   updated_at: String
});

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/test');

exports.Post = mongoose.model('Post',Post);