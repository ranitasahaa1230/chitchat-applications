const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);


app.use('/', express.static(path.join(__dirname, '/public')));

const users={}


io.on('connection',(socket)=>{

        socket.on('login',(data)=>{
            // console.log(data.name);
            users[socket.id]=data.name //users mapping
        
        })
        socket.on('send_msg',(data)=>{

            // console.log(data.msg);
        io.emit('received_msg',{
            msg:data.msg,
            // id:socket.id
            name:users[socket.id]//name milega users se
        
        })
        
    })
        
        
    })

server.listen(process.env.PORT || 8001, () => {
    console.log('server running at http://localhost:8001');
})