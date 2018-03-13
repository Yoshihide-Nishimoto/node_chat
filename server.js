var http = require("http");
var server = http.createServer();
var url = require("url");

server.on("request",function(req,res){
    // console.log("request caught");
    // res.writeHead(200);
    // res.end("Oh My God");

    var incomingUrl = url.parse(req.url);
    console.log(incomingUrl);

    if(incomingUrl.path === "/hello") {

        console.log("request caught");
        res.writeHead(200);
        res.end("Oh My God");
    } else if (incomingUrl.path === "/goodbye") {
        res.writeHead(200);
        res.end("Oh My God");
    } else {
        res.writeHead(400);
        res.end("Resource not found");
    }


});

server.listen(3000);