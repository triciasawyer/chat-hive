'use strict';


const { handleResponse } = require('./handler');

describe('handleResponse', () => {
  test('Generates a response with the expected properties', () => {
    const payload = {
      userName: 'John',
      text: 'Hi',
      messageId: 1234,
      queueId: 'messages',
    };

    const response = handleResponse(payload);

    expect(response).toEqual(handleResponse.payload);
  });


});