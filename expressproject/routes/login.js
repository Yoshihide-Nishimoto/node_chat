var model = require('../model/user');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(express) {

    var router = express.Router();
    var User = model.User;


    var loginCheck = function(req, res, next) {
        if(req.session.user){
            console.log("your are already logined...");
            next();
        }else{
            console.log("you need to login...");
            res.redirect('/login');
        }
    };

    // ログインページ
    router.get("/", function (req, res) {
        console.log("login precess....");
        res.render('login',{message:""});
    });

    router.post("/", function (req, res) {
        console.log("login process ... ");
        var email    = req.body.email;
        var password = req.body.password;
        console.log();
        User.findOne({email:email}, function(err, doc) {
            if(doc){
                console.log(doc.password);
                bcrypt.compare(password,doc.password,function(err,flg){
                    if(flg){
                        console.log("login success.... your name is " + doc.name);
                        req.session.user = {name:doc.name};
                        res.redirect('/');
                    }else{
                        console.log("password is incorrect");
                        res.render('login',{message:"メールアドレス・パスワードいずれかが不正です"});
                    }
                });
            } else {
                console.log("User does not exist ");
                res.render('login',{message:"メールアドレス・パスワードいずれかが不正です"});
            }
        });
    });

    return router;
}