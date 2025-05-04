const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//store user onlienid

const userSocketMap = {};
const getReceiverSocketId = async (receiverId) => {
  userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(userId, socket.id);
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(userId, socket.id);
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
