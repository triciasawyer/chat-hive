'use strict';


const Chance = require('chance');
let chance = new Chance();


function handleHive(){

  let payload = { 
    userName: chance.name({ nationality: 'en' }),
    text:  `Hi, how are you ${chance.first()}? `,
    messageId: chance.guid(),
    queueId: 'messages',
  };
  return payload;
  // console.log(`Messenger: message sent: ${payload.text}`);
 
}


function handleSports(){
  // setInterval(() => {
  let payload = { 
    userName: chance.name({ nationality: 'en' }),
    text: `What is your favorite sport ${chance.first()}? `,
    messageId: chance.guid(),
    queueId: 'Sports chat messages',
  };
  return payload;
  // console.log(`Messenger: message sent: ${payload.text}`);
  // }, 4000);
}


module.exports = { handleHive, handleSports };