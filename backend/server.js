require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { app, server } = require("./src/socket/socket");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://mini-insta-sage.vercel.app", "http://localhost:5173"], // Add your local frontend URL
    credentials: true, // Allow cookies if needed
  })
);

app.use(cookieParser());
const connect = require("./src/db/db");
const userRoutes = require("./src/routes/users.routes");
const postRoutes = require("./src/routes/posts.routes");
const messageRoutes = require("./src/routes/message.routes");
connect();

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/messages", messageRoutes);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
