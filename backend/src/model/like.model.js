const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  postId: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const LikeModel = mongoose.model("Likes",likeSchema);
module.exports = LikeModel;
