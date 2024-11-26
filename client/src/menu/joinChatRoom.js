const { prompt } = require('inquirer');
const axios = require('axios');

module.exports = async function joinChatRoom(client, chatRoom = null) {
    if (chatRoom) {
        client.emit('join', chatRoom);
    } else {
        const response = await axios.get('http://65.0.135.109:3000/api/chatrooms');
        const chatRooms = response.data;
        const chatRoomsOption = [
            {
                type: 'list',
                name: 'selectedRoom',
                message: 'Choose a Chat Room:',
                choices: chatRooms,
            },
        ]
        const { selectedRoom } = await prompt(chatRoomsOption);
        client.emit('join', selectedRoom);
        return selectedRoom;
    }
}
