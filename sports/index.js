'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/sports');


setTimeout(() => {
  socket.emit('Join', 'joinSportsChat');
}, 3000);