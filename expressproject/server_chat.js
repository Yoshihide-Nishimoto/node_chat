const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('port', (process.env.PORT || 3000));

app.get("/",function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('Node app is running on port', app.get('port'));
});

io.sockets.on('connection',function(socket){
   socket.on('emit_from_client',function(data){
      console.log(data);
      io.sockets. json.emit('emit_from_server',{
            data: data,
            user:
      });
      //  socket.emit('emit_from_server',data);
      //  socket.broadcast.emit('emit_from_server',data);
   });
});


