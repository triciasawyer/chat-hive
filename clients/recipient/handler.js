'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/ChatHive');
const Chance = require('chance');
let chance = new Chance();


function handleResponse(payload){
  let response = {
    text: `Hi ${payload.userName}, I love baseball, how about you?`,
    messageId: chance.guid(),
    queueId: payload.queueId,
  };
  // console.log('TTTTTTTT', response);
  socket.emit('Received2', response);
}


// function handleHive(){
//   let payload = { 
//     userName: chance.name({ nationality: 'en' }),
//     text:  `Hi, how are you ${chance.first()}? `,
//     messageId: chance.guid(),
//     queueId: 'messages',
//   };
//   return payload;
//   // console.log(`Messenger: message sent: ${payload.text}`);
// }


module.exports = { handleResponse };