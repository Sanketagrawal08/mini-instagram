const express = require("express");
const userRoutes = require("../src/routes/users.routes");
const postRoutes = require("../src/routes/posts.routes")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;