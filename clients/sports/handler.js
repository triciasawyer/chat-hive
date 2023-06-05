'use strict';


// const { io } = require('socket.io-client');
// const sportsChat = io('http://localhost:3002/sports');
const Chance = require('chance');
let chance = new Chance();


function handleResponse(payload){
  let response = {
    text: `Hi ${payload.userName}, I love baseball, how about you?`,
    messageId: chance.guid(),
    queueId: payload.queueId,
  };
  console.log(response);
}


module.exports = { handleResponse };