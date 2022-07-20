const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { v1: uuidv1 } = require("uuid");
const io = new Server(server, {
  path: "/chat-panel/",
  cors: {
    origin: "*",
  },
});

let customers = [];

const chatMessages = {};

app.get("/officer", (req, res) => {
  res.sendFile(__dirname + "/officer.html");
});
app.get("/customer", (req, res) => {
  res.sendFile(__dirname + "/customer.html");
});

app.use(express.static(`${__dirname}/dist`));

io.on("connection", (socket) => {
  const { name } = socket.handshake.auth;
  if (name !== "officer") {
    customers.push({ username: name, socketid: socket.id });
    customers = customers.reduce((prev, curr) => {
      if (!prev.find((p) => p.username === curr.username)) prev.push(curr);
      return prev;
    }, []);
    socket.join(name);
    if (!chatMessages[name]) chatMessages[name] = [];
    chatMessages[name].forEach((chatMessage) =>
      io.to(name).emit("chat message", chatMessage)
    );
  }

  io.emit("customers", customers);
  socket.on("chat message", (msg) => {
    msg.id = uuidv1();
    io.to(msg.room).emit("chat message", msg);
    chatMessages[msg.room].push(msg);
  });
  socket.on("pickup", (customer) => {
    socket.join(customer.name);
    io.to(customer.name).emit("pickup");
    if (!chatMessages[customer.name]) chatMessages[customer.name] = [];
    chatMessages[customer.name].forEach((chatMessage) =>
      io.to(customer.name).emit("chat message", chatMessage)
    );
  });

  socket.on("pickdown", ({ name }) => emitEndChat(name));
  socket.on("close chat", ({ name }) => emitEndChat(name));

  function emitEndChat(name) {
    const endchatmessage = {
      type: "system",
      userid: socket.id,
      content: "this chat is ended",
      room: name,
      id: uuidv1(),
    };
    chatMessages[name]?.push(endchatmessage);
    io.to(name).emit("chat message", endchatmessage);
    io.to(name).emit("end chat");
    delete chatMessages[name];
  }

  socket.on("disconnect", () => {
    customers = customers.filter((customer) => customer.socketid !== socket.id);
    io.emit("customers", customers);
  });
});

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
