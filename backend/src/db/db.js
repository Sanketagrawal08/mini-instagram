const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(
      "mongodb+srv://sanketagrawal6969:3HQkaPT8fBOSvfGa@cluster0.3hign.mongodb.net/instaDB?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("error", err);
    });
}
module.exports = connect;
