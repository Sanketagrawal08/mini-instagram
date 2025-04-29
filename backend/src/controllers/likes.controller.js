const LikeModel = require("../model/like.model");

module.exports.LikePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const isLiked = await LikeModel.findOne({ userId, postId });
    if (isLiked) {
      await LikeModel.findByIdAndDelete(isLiked._id);
      console.log("Post unliked successfully!");
      return res.status(200).json({ message: "Post unliked successfully!" });
    } else {
      const newLike = await LikeModel.create({ userId, postId });
      console.log("post liked succesfully");
      return res
        .status(201)
        .json({ message: "Post liked successfully!", like: newLike });
    }
  } catch (error) {
    console.log("error in post liking");
    return res.status(400).json({ message: "Error in liking post" });
  }
};
