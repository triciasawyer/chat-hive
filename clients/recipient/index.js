'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/ChatHive');
const { handleResponse } = require('./handler');


// socket.on('connection', () => {
//   console.log(message);
//   let message = handleHive();
//   socket.broadcast.emit('Message', message);
// });


// listening for message
socket.on('Message', (payload) => {
  console.log('Message received:', payload);
  handleResponse(payload);
  socket.emit('Received', payload);
});


// listening for message from sports chat
socket.on('Received', (payload) => {
  console.log('message received:', payload);
});
