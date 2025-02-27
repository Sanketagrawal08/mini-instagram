const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  media: {
    type: String,
  },
  caption: {
    type: String,
  },
});
const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel