var express = require('express');
var app = express();
var server = require('http').Server(app);
//const io = require('socket.io')(server);
var hostname = '127.0.0.1';
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/game.html');
});
app.get('/requires.js', function (req, res) {
    res.sendFile(__dirname + '/requires.js');
});
app.get('/gl-matrix.js', function (req, res) {
    res.sendFile(__dirname + '/gl-matrix.js');
});
app.use('/outScripts', express.static('outScripts'));
server.listen(port, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
// io.on('connection', (socket) => {
// 	console.log('connection');
// });
