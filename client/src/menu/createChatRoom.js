const { prompt } = require('inquirer');
const joinChatRoom = require('./joinChatRoom');
const axios = require('axios');
const question = [
  {
    type: 'input',
    name: 'roomName',
    message: 'Enter Room Name'
  }
]

module.exports = async function createChatRoom(client) {
  try {
    const answer = await prompt(question);
    const roomName = answer.roomName;

    const response = await axios.post('http://65.0.135.109:3000/api/chatrooms', {
      roomName
    });
    const chatRoom = response.data;
    console.log(`${chatRoom} chat room created`);
    joinChatRoom(client, chatRoom);
    return chatRoom;
  } catch (error) {
    if (error.response.data.message) {
      console.info(error.response.data.message);
      createChatRoom(client); // Recursive call to prompt again
    } else {
      console.error(error);
    }
  }
};
