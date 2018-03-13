var model = require('../model/blog');
var mongodb = require('mongodb');
require('date-utils');

module.exports = function(express) {

   var router = express.Router();
   var Blog = model.Blog;

    // トップ
    router.get("/", function (req, res) {
        console.log("access to root...");
        res.redirect("/blogs");
    });

    // 一覧取得
    router.get("/blogs", function (req, res) {
        console.log("list getting .... ");
        Blog.find({}, function(err, docs) {
            res.render('index',{name:req.session.user.name,data:docs});
        });
    });

    // 新規画面
    router.get("/blogs/new", function (req, res) {
        console.log("show creating new blog form....");
        res.render('newblog',{title:"",content:"",_id:"",message:""});
    });

    // 詳細取得
    router.get("/blogs/:_id", function (req, res) {
        console.log("Blog getting .... id:" + req.params._id);
        Blog.findOne({_id:mongodb.ObjectID(req.params._id)}, function(err, doc) {
            res.render('newblog',{title:doc.title,content:doc.content,_id:doc._id,message:""});
        });
    });

    // 追加・更新
    router.post("/blogs", function (req, res) {
        var _blog = req.body;
        var dt = new Date();
        var formattedDate = dt.toFormat("YYYY/MM/DD");
        var message = "";
        if(!required_input(_blog.title)){
            message = "タイトルを入力してください。";
        }
        if(!required_input(_blog.content)){
            message = "内容を入力して下さい。";
        }
        if(message!=""){
            res.render('newblog',{title:_blog.title,content:_blog.content,_id:_blog._id,message:message});
        }
            console.log(_blog);
            if (_blog._id != "") {
                console.log("update");
                Blog.update({$and: [
                    {_id: mongodb.ObjectID(_blog._id)},{author:req.session.user.name}]},
                    {
                        $set: {
                            title: req.body.title,
                            content: req.body.content,
                            author: req.session.user.name,
                            updated_at: formattedDate
                        }
                    },
                    {upsert: false},
                    function (err,data) {
                        if(data.nModified==0){
                            console.log("更新できない記事です");
                            message = "更新できない記事です";
                            res.render('newblog',{title:_blog.title,content:_blog.content,_id:_blog._id,message:message});
                        }
                        if (err) {
                            throw err;
                        }
                    }
                );
            } else {
                console.log("insert");
                var blog = new Blog({
                    title: req.body.title,
                    content: req.body.content,
                    author: req.session.user.name,
                    created_at: formattedDate,
                    updated_at: ""
                });
                blog.save(function () {
                });
                res.redirect('/');
            }

    });

    // 削除
    router.get("/blogs/delete/:_id", function (req, res) {
        console.log("delete process ....");
        Blog.remove({_id: mongodb.ObjectID(req.params._id)}, function () {
            res.redirect('/');
        });
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
