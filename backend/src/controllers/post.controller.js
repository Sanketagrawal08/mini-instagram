const PostModel = require("../model/post.model")

module.exports.createPost = async (req, res) => {
    try {
      const { media, caption } = req.body;
      const post = await PostModel.create({ media, caption });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  