const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

const chatMessages = []; // Collection to store chat messages

io.on('connection', (socket) => {
  console.log('a user connected');

  // Send previous chat messages to the newly connected client
  socket.emit('chatHistory', chatMessages);

  socket.on('message', (message) => {
    console.log(message);
    const chatMessage = `${socket.id.substr(0, 2)} said ${message}`;
    chatMessages.push(chatMessage); // Store the new chat message
    io.emit('message', chatMessage);
  });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));



// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 
