const http = require('http');
const PORT = 8124;
var user = require('./blog/user');
const user = reguire('./post');
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;
var body="";
 
// 接続文字列
var url = "mongodb://localhost:27017/foo";
 
// MongoDB へ 接続
    MongoClient.connect(url, (error, db) => {
    var collection;
 
    console.log("kokomadeda");
    // コレクションの取得
    collection = db.collection("test");
 
    // コレクションに含まれるドキュメントをすべて取得
    collection.find().toArray((error, documents) => {
        for (var document of documents) {
            body = body + document.name + "\n";
            console.log(document.name);
        }
    });
 
    // コレクション中で条件に合致するドキュメントを取得
    collection.find({price: {$lt: 2000}}).toArray((error, documents)=>{
        for (var document of documents) {
            console.log(document.name);
        }
    });
  });



http.createServer((request, response) => {
console.log("start");
//GETリクエストだったら
    if (request.url == '/' && request.method == 'GET') {
        // serve.jsと同じ階層にあるindex.htmlを読み込む
        //(__dirnameは実行中のスクリプトがあるディレクトリの名前)
        fs.readFile(__dirname + '/test.html', {
            encoding: 'utf8'
        }, function(err, html) {
            // ファイルの読み込みに失敗したらエラーのレスポンス
            if (err) {
                response.statusCode = 500;
                response.end('Error!');
            }
            // ファイルの読み込みが成功したらHTMLをかえす
            else {
                response.setHeader('Content-Type', 'text/html');
                response.end(html);
            }
        });

    } else if (request.url === '/postPage' && request.method === 'POST') {
        
        console.log(`PostPage`);

        user.createUser();

        MongoClient.connect(url, (error, db) => {
        var collection;
 
        console.log("kokomade");
        collection = db.collection("test");

        collection.insert({"name":});

        response.setHeader('Content-Type', 'text/html');
        response.end(body);

    } else {

        response.statusCode = 404;
        response.end('Not Found!!');
    
    }
  
}).listen(PORT);

console.log(`Server running at http://localhost:${PORT}/`);