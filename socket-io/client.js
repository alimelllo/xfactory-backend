const socket = io.connect('http://localhost:8081');

//sending the initial positions to the server
socket.emit('newPlayer', console.log("new player emit fired - client"));

//creating room number 1
socket.emit('create', 'room1');

//reacting for new and disconnecting clients
socket.on('updatePlayers', console.log('updatePlayers on - client'))