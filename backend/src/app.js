const express = require("express");
const userRoutes = require("../src/routes/users.routes");
const postRoutes = require("../src/routes/posts.routes")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", userRoutes);
// app.use("/posts", postRoutes)

module.exports = app;