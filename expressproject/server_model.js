var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')({
    secret: 'my-secret-key',
    resave: true,
    saveUninitialized: true
});
var sharedsession = require('express-socket.io-session');

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/test');

var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var route_post = require('./routes/post')(express);
var route_login = require('./routes/login')(express);
var route_signup = require('./routes/signup')(express);
var route_logout = require('./routes/logout')(express);
var route_chat = require('./routes/chat')(express);

//app.use(express.static('front_model'));
app.set('views', __dirname + '/front_model');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('port', (process.env.PORT || 3001));
const PORT = process.env.PORT || 3000

app.use(cookieParser());
// app.use(session({
//     secret: 'test',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 30 * 60 * 1000 // 30min.
//     }
// }));
app.use(session);

var sessionCheck = function(req, res, next) {
    if (req.session.user) {
        console.log("session is OK");
        next();
    } else {
        console.log("session is NG,Please Login");
        console.log("requestURL:" + req.url);
        res.redirect('/login');
    }
};
io.use(sharedsession(session, {
     autoSave: true
}));

app.use('/login',route_login);
app.use('/signup',route_signup);
app.use('/',sessionCheck,route_post);
app.use('/logout',route_logout);
app.use('/chat',route_chat);

http.listen(PORT, function(){
    console.log('Node app is running on port 3000');
});

io.sockets.on('connection',function(socket){
    socket.on('emit_from_client',function(data){
        console.log(socket.handshake.session);
        console.log(data.userName);
        console.log(data.data);
        io.sockets.json.emit('emit_from_server',{
             userName:data.userName,
             data:data.msg
        });
    });
});