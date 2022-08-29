const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 8080;
const app = express();

// sample route
app.get("/user", (req, res) => {
    res.send("<h1>Hello World</h1>");
})

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Socket setup
const io = socket(server, {
  cors: { origin: "*" },
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message-server", `${socket.id.substr(0, 2)} said ${message}`);
  });
});



// ------------------------------------------------------------------------------
// REGULAR HTTP SERVER

// const http = require('http').createServer();

// const io = require('socket.io')(http, {
//     cors: { origin: "*" }
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('message', (message) =>     {
//         console.log(message);
//         io.emit('message', `${socket.id.substr(0,2)} said ${message}` );
//     });
// });

// http.listen(8080, () => console.log('listening on http://localhost:8080') );



// --------------------------------------------------------------------------------
// REGULAR WEBSOCKET

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });
