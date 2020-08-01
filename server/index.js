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
  console.log('------------------we have a new connetion----')
  const uploader = new siofu();
  uploader.dir = "/uploads";
  uploader.listen(socket);

  uploader.on("saved", function(event){
    console.log(event.file),'event-----------file';
});

  uploader.on("error", function(event){
    console.log("E-------------rror from uplo---------ader", event);
});

  
  socket.on('join', ({name, room}, callback)=>{
    const { user, error } = addUser({ id:socket.id, name, room })
    if(error) {
      return callback(error)
    }

    //admin system정보 여기서
    socket.emit('message', { user:'admin', text:`${user.name}, welcome to the room ${user.room}` })
    
    //braodcast는 room에 있는 모든 사람에게 msg를 보낸다.
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
