const socket = io.connect('http://localhost:8081');

//sending the initial positions to the server
socket.emit('newPlayer', console.log("new player emit fired - client"));
//reacting for new and disconnecting clients
socket.on('updatePlayers', console.log('updatePlayers on - client'))