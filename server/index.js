'use strict';


const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
let textQueue = new Queue();

// socket server singleton... called io or server
const io = new Server();


// create namespace
const caps = io.of('/ChatHive');


caps.on('connection', (socket) => {
  console.log('Connected to chat hive namespace', socket.id);

  
  const sports = io.of('/sports');
  sports.on('connection', (socket) => {
    console.log('Successfully connected to sports chat', socket.id);
  });

  
  socket.on('Join', (room) => {
    console.log('Chat rooms', socket.adapter.rooms);
    console.log('/sports', room);
    socket.join(room);
    console.log('You have joined the ${room} room');
  });
  



  //   // how to join a room 
  //   socket.on('JOIN', (room) => {
  //     console.log('these are the rooms', socket.adapter.rooms);
  //     console.log('---payload is the room name in this example--', room);
  //     socket.join(room);
  //     console.log(`you've joined the ${room} room`);
  //     console.log('these are All the current rooms', socket.adapter.rooms);
  //     // how to emit to a room:  maybe useful later
  //     // socket.to(room).emit('some-event', some-payload);

  //   });
  // });


  socket.on('Message', (payload) => {
    let messageQ = textQueue.read(payload.queueId);
    if (!messageQ) {
      let messageQkey = textQueue.chat(payload.queueId, new Queue());
      messageQ = textQueue.read(messageQkey);
      
    }
    messageQ.chat(payload.messageId);
    socket.broadcast.emit('Message', payload);

  });


  socket.on('Received', (payload) => {
    let messageQ = textQueue.read(payload.queueId);
    if (!messageQ) {
      throw new Error('We got the messages but no queue');
    }
    let text = messageQ.remove(payload.messageId);
    socket.broadcast.emit('Received', text);
  });


  socket.on('Get message', (payload) => {
    console.log('attempt to get the messages');
    let messageQ = textQueue.read(payload.queueId);
    if (messageQ && messageQ.data) {
      Object.keys(messageQ.data).forEach(messageId => {
        socket.emit('Message', messageQ.read(messageId));
      });
    }
  });


});




console.log('Listening on PORT:', PORT);
//listening for all events at port
io.listen(PORT);