'use strict';


const { io } = require('socket.io-client');
const sportsChat = io('http://localhost:3002/sports');
const chatHive = io('http://localhost:3002/ChatHive');


const Chance = require('chance');
const chance = new Chance();


setInterval(() => {
  let payload = { 
    userName: chance.name({ nationality: 'en' }),
    text:  `Hi, how are you ${chance.first()}? `,
    messageId: chance.guid(),
    queueId: 'messages',
  };
  chatHive.emit('Message', payload);
}, 4000);


setInterval(() => {
  let payload = { 
    userName: chance.name({ nationality: 'en' }),
    text: `What is your favorite sport ${chance.first()}? `,
    messageId: chance.guid(),
    queueId: 'Sports chat messages',
  };
  sportsChat.emit('Message', payload);
  console.log(`Messenger: message sent: ${payload.text}`);
}, 4000);
