var express = require("express");
var app = express();

var morgan = require("morgan");
app.use(morgan("dev"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var router = require("./routes/route2")(express);
app.use("/",router);

app.listen(3000,function(){
    console.log("Running on port 3000")
})