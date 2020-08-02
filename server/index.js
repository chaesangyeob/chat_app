const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const siofu = require("socketio-file-upload");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket)=>{
  const uploader = new siofu();
  uploader.dir = "/uploads";
  uploader.listen(socket);

  uploader.on("saved", function(event){
    console.log(event.file),'saved';
});

  uploader.on("error", function(event){
    console.log("error", event);
});

  
  socket.on('join', ({name, room}, callback)=>{
    const { user, error } = addUser({ id:socket.id, name, room })
    if(error) {
      return callback(error)
    }

    socket.emit('message', { user:'admin', text:`${user.name}, welcome to the room ${user.room}, please read README on github https://github.com/chaesangyeob/chat_app` })
    
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.join(user.room)

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    callback()
  })

  socket.on('sendMessage', (message, callback) => {

    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    io.to(user.room).emit('message', { user:'admin', text: `${user.name} has left`})
  })
})

app.use(siofu.router)

server.listen(PORT, ()=> console.log('---SERVER START---'))
