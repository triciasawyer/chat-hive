'use strict';


class Queue {
  constructor () {
    this.data = {};
  }

  chat(key, value){
    this.data[key] = value;
    console.log('Something was added to the queue');
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    let value = this.data[key];
    delete this.data[key];
    console.log('Something was removed from the queue');
    return value;
  }


}


module.exports = Queue;