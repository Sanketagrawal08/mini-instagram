const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = require("../src/routes/users.routes");

app.use("/users", userRoutes);
app.use(express.urlencoded({ extended: true }));

module.exports = app;
