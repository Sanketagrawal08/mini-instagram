const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://localhost:27017/insta")
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("error", err);
    });
}
module.exports = connect;