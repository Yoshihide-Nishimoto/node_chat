var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var users;
var routes = require('./routes/index');

app.use(express.static('front_login'));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 // 30min.
    }
}));

app.listen(3000);

var sessionCheck = function(req, res, next) {
    if (req.session.user) {
        next();
        console.log("session is OK");
    } else {
        res.redirect('/login');
        console.log("session is NG,Please Login");
    }
};

console.log("test");
app.use('/', sessionCheck, routes);

mongodb.MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
    users = database.collection("blog");
});

// 一覧取得
app.get("/api/blog", function(req, res) {
    users.find().toArray(function(err, items) {
        res.send(items);
    });
});

// 個人取得
app.get("/api/blog/:_id", function(req, res) {
    users.findOne({_id: mongodb.ObjectID(req.params._id)}, function(err, item) {
        res.send(item);
    });
});

// 追加・更新
app.post("/api/blog", function(req, res) {
    var user = req.body;
    if (user._id) user._id = mongodb.ObjectID(user._id);
    users.save(user, function() {
        res.send("insert or update");
    });
});

// 削除
app.delete("/api/blog/:_id", function(req, res) {
    users.remove({_id: mongodb.ObjectID(req.params._id)}, function() {
        res.send("delete");
    });
});