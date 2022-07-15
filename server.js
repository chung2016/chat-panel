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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/officer.html");
});

io.on("connection", (socket) => {
  const { name } = socket.handshake.auth;
  console.log("a user connected name: ", name);
  socket.on("send-message", () => {
    console.log("socket send-message");
  });

  socket.on("disconnect", () => {
    console.log("socket disconnect");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
