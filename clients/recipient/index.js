'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/ChatHive');


socket.emit('Get message', {queueId: 'messages'});


// listening for message
socket.on('Message', (payload) => {
  // setTimeout(() => {
  console.log('Message received:', payload);
  socket.emit('Received', payload);
  // }, 3000);
});