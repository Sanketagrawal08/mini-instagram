const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  media: {
    type: String,
  },
  caption: {
    type: String,
  },
  userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
});
const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel