'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/ChatHive');
const Chance = require('chance');
let chance = new Chance();


setInterval(() => {
  let payload = { 
    text:  `Hi, how are you doing ${chance.first()}? `,
    messageId: chance.guid(),
    queueId: 'messages',
  };
  console.log(`Messenger: message sent: ${payload.text}`);
  socket.emit('Message', payload);
}, 3000);
