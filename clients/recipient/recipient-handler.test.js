'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/ChatHive');
const { handleResponse } = require('./handler');


jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  return {
    io: jest.fn().mockReturnValue({
      emit,
    }),
  };
});
  
let consoleSpy;
  
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});
  
afterEach(() => {
  consoleSpy.mockRestore();
});

  
describe('handleResponse', () => {
  test('Sends a response to the initial encoding message in the sports chat', () => {
    let response = { 'messageId': expect.any(String), 'queueId': expect.any(String), 'text': 'Hi undefined, I love baseball, how about you?'};

    handleResponse(response);

    expect(socket.emit).toHaveBeenCalledWith('Received2', response);
  });


});