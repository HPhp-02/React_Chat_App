const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

const {addUser,reomveUser,getUser,getUsersInRoom} = require('./users.js');


const PORT = process.env.PORT || 5000;

// Import router if you have additional routes
const app = express();
const router = require('./router');


// Apply CORS middleware
app.use(cors()); // This will allow all origins by default

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
      origin: "*", // Adjust this for specific origins in production
      methods: ["GET", "POST"]
  }
});

// Use your router
app.use(router);

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('We have a new Connection');
    
    socket.on('join', ({name, room},callback) => {
       const {error,user}=addUser({id:socket.id,name,room});

       if(error) return callback(error);

       socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`});
       socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined!`});
       socket.join(user.room);

       io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
       callback();
    });

  
    socket.on('sendMessage',(message,callback)=>{
      const user = getUser(socket.id);

      io.to(user.room).emit('message',{user:user.name,text:message});
      io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});

      callback();
    });

    // Optionally, handle disconnection
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
          io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
        }
    });

});

// Start the server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
