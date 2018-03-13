var articles = [];

//
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/foo";
var post;
//

module.exports = function (express) {

    MongoClient.connect(url, function(err, database) {
        post = database.collection("post");
    });

    var router = express.Router();
    var content = "";

    console.log("debug:route2start");

    router.route("/").get(function(req, res){
        console.log("debug:route2get");
        res.render("index", {});
    });

    router.route("/articles")
        .get(function(req,res){
            console.log("get /article start");
            // コレクションに含まれるドキュメントをすべて取得
            post.find().toArray(function(err, items) {
                res.send(items);
            });
        }).post(function(req,res){
            //articles.push(req.body)
            MongoClient.connect(url, (error, db) => {
                var collection;
                collection = db.collection("post");
                // コレクションに含まれるドキュメントをすべて取得
                collection.insert({"title":req.body.title,"author":req.body.author,"content":req.body.content});
            });
        articles = [];
            res.redirect("/articles");
        });
    return router;
}
