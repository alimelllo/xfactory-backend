import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';

const app: Express = express();

const server = app.listen(8081, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${8081}`);
});

const io = require('socket.io')(server)

dotenv.config();

const cors = require('cors');
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
theApp(app);
localize(app);
db();
routes(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//The 'connection' is a reserved event name in socket.io
//For whenever a connection is established between the server and a client
io.on('connection', (socket) => {

	//Displaying a message on the terminal
    console.log('a user connected');
    //Sending a message to the client
    socket.emit('serverToClient', "Hello, client!");
    //Receiving a message from the client and putting it on the terminal
    socket.on('clientToServer', data => {
        console.log(data);
    })
    //When the client sends a message via the 'clientToClient' event
    //The server forwards it to all the other clients that are connected
    socket.on('clientToClient', data => {
        socket.broadcast.emit('serverToClient', data);
    })
    
});

export default app;
