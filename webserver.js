const express = require('express');
const app = express();
const server = require('http').Server(app);
//const io = require('socket.io')(server);

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/game.html');
});

app.use('/scripts', express.static('outScripts'));

server.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// io.on('connection', (socket) => {
// 	console.log('connection');
// });
