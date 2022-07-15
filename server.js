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

let chat = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/officer.html");
});

io.on("connection", (socket) => {
  const { name } = socket.handshake.auth;
  if (name !== "officer") {
    customers.push({ username: name, socketid: socket.id });
    socket.join(socket.id);
  }

  io.emit("customers", customers);
  socket.on("chat message", (msg) => {
    console.log(`io.to(${msg.userid}).emit("chat message", ${msg});`);
    io.to(msg.room).emit("chat message", msg);
  });
  socket.on("pickup", (customer) => {
    console.log("pickup", customer);
    socket.join(customer.socketid);
    chat[customer.socketid] = [];
    io.to(customer.socketid).emit("pickup", customer);
  });

  socket.on("disconnect", () => {
    customers = customers.filter((customer) => customer.socketid !== socket.id);
    io.emit("customers", customers);
    console.log("socket disconnect");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
