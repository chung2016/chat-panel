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
    console.log('connection: ', name);
    customers.push({ username: name, socketid: socket.id });
    socket.join(name);
    if (!chatMessages[name]) chatMessages[name] = [];
  }

  io.emit("customers", customers);
  socket.on("chat message", (msg) => {
    io.to(msg.room).emit("chat message", msg);
  });
  socket.on("pickup", (customer) => {
    console.log('pickup', customer);
    socket.join(customer.name);
    io.to(customer.name).emit("pickup");
  });

  socket.on("close chat", ({ name }) => {
    const endchatmessage = {
      type: "system",
      userid: socket.id,
      content: "this chat is ended",
      room: name,
    };
    chatMessages[name].push(endchatmessage);
    io.to(name).emit("chat message", endchatmessage);
    io.to(name).emit("end chat");
    delete chatMessages[name];
  });

  socket.on("disconnect", () => {
    customers = customers.filter((customer) => customer.socketid !== socket.id);
    io.emit("customers", customers);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
