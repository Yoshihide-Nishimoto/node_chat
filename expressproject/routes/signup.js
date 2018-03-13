var model = require('../model/user');
var mongodb = require('mongodb');
require('date-utils');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(express) {

    var router = express.Router();
    var User = model.User;

    // 登録画面
    router.get("/", function (req, res) {
        console.log("list getting .... ");
        res.render('signup',{message:""});
    });

    // 登録処理
    router.post("/", function (req, res) {
        console.log("signup process ... ");
        var name = req.body.name;
        var email    = req.body.email;
        var password = req.body.password;
        var message="";

        if(!required_input(name)){
            message = "ユーザ名を入力してください。";
        }
        if(!required_input(email)){
            message = "メールアドレスを入力して下さい。";
        }

        if(message!=""){
            res.render('signup',{message:message});
        } else {
            User.find({$or: [{email: email}, {name: name}]}, function (err, docs) {
                if (docs.length>0) {
                    console.log(req.body);
                    console.log(docs);
                    console.log("your account is already created....");
                    res.render('signup', {message: "ユーザ名もしくはメールアドレスが登録済みです"});
                } else {
                    console.log("Account creating....");
                    var dt = new Date();
                    var formattedDate = dt.toFormat("YYYY/MM/DD");
                    bcrypt.hash(password,null,null,function(err,hash){
                        var user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            created_at: formattedDate
                        });
                        user.save(function () {
                        });
                        console.log("account created");
                    });

                    res.render('login', {message: ""});
                }
            });
        }
    });

    return router;
}

function required_input(input){
    if (input == null || input == ""){
        return false;
    } else {
        return true;
    }
}