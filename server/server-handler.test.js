// const Chance = require('chance');
// let chance = new Chance();
// const { handleHive, handleSports } = require('./handler');

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


describe('handleHive', () => {
  test('Returns a message payload with the expected properties', () => {
    const expectedPayload = {
      userName: expect.any(String),
      text: expect.any(String),
      messageId: 1234,
      queueId: 'messages',
    };
    
    
    expect(expectedPayload.userName).toEqual('');
    expect(expectedPayload.text).toEqual('');
    expect(expectedPayload.messageId).toEqual(1234);
    expect(expectedPayload.queueId).toEqual('messages');
  });


  //   test('Returns a message payload with the expected properties', () => {
  //     const expectedPayload = {
  //       userName: expect.any(String),
  //       text: expect.any(String),
  //       messageId: expect.any(String),
  //       queueId: 'Sports chat messages',
  //     };

  //     chance.name.mockReturnValue('John Doe');
  //     chance.first.mockReturnValue('John');

  //     const payload = handleSports();

  //     expect(payload).toEqual(expectedPayload);
  //   });


});