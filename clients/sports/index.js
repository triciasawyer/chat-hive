'use strict';


const { io } = require('socket.io-client');
const { handleResponse } = require('./handler');
const sportsChat = io('http://localhost:3002/sports');


// handleSports(sportsChat);


sportsChat.on('Message',(message) => {
  console.log(message);
  handleResponse(message);
  sportsChat.emit('Received2', message);
});


sportsChat.on('Received2', (payload) => {
  console.log('Message response received,', payload.text);
});


