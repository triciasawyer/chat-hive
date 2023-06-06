'use strict';


const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
// const { handleSports } = require('./handler');
let textQueue = new Queue();

// socket server singleton... called io or server
const io = new Server();


// create namespace
const caps = io.of('/ChatHive');

caps.on('connection', (socket) => {
  console.log('Connected to chat hive namespace', socket.id);
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT:', {event, time, payload});
  });
  

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


const sports = io.of('/sports');
sports.on('connection', (socket) => {
  console.log('Successfully connected to sports chat', socket.id);
  // let message = handleSports();
  // socket.broadcast.emit('Message', message);

  
 

  socket.on('Message', (payload) => {
    let messageQ = textQueue.read(payload.queueId);
    if (!messageQ) {
      let messageQkey = textQueue.chat(payload.queueId, new Queue());
      messageQ = textQueue.read(messageQkey);
      
    }
    messageQ.chat(payload.messageId);
    socket.broadcast.emit('Message', payload);
  });


  socket.on('Received2', (payload) => {
    let messageQ = textQueue.read(payload.queueId);
    if (!messageQ) {
      throw new Error('We got the messages but no queue');
    }
    let text = messageQ.remove(payload.messageId);
    socket.broadcast.emit('Received2', text);
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
io.listen(PORT);