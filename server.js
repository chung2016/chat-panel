const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let customers = [];

const chatMessages = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/officer.html");
});

io.on("connection", (socket) => {
  const { name } = socket.handshake.auth;
  if (name !== "officer") {
    customers.push({ username: name, socketid: socket.id });
    socket.join(socket.id);
    if (!chatMessages[name]) chatMessages[name] = [];
  }

  io.emit("customers", customers);
  socket.on("chat message", (msg) => {
    io.to(msg.room).emit("chat message", msg);
  });
  socket.on("pickup", (customer) => {
    socket.join(customer.socketid);
    chatMessages[customer.socketid] = [];
    io.to(customer.socketid).emit("pickup", customer);
  });

  socket.on("close chat", ({ name, socketid }) => {
    const endchatmessage = {
      type: "system",
      userid: socket.id,
      content: 'this chat is ended',
      room: socketid,
    }
    chatMessages[name].push(endchatmessage);
    io.to(socketid).emit("chat message", endchatmessage);
    io.to(socketid).emit('end chat');
  });

  socket.on("disconnect", () => {
    customers = customers.filter((customer) => customer.socketid !== socket.id);
    io.emit("customers", customers);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
