const PostModel = require("../model/post.model");
const LikeModel = require("../model/like.model")

module.exports.createPost = async (req, res) => {
  try {
    const { media, caption } = req.body;
    const userId = req.user.id;
    const post = await PostModel.create({ media, caption, userId });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getAll = async (req, res) => {
  const allPosts = await PostModel.find().populate("userId");



  const postsWithLikeStatus = await Promise.all(
    allPosts.map(async (post) => {

      const likeCount = await LikeModel.countDocuments({postId : post._id})

      const isLiked = await LikeModel.findOne({
        postId: post._id,
        userId: req.query.userId, 
        
      });
  
      return {
        ...post._doc,
        likedByCurrentUser: !!isLiked,
        likeCount:likeCount
      };
    })
  );
  console.log(postsWithLikeStatus)
  res.status(200).json(postsWithLikeStatus);
  
};

module.exports.fetchByUserId = async (req,res) => {
     const userId = req.params.id
    //  console.log(userId)
    try {
      const posts = await PostModel.find({userId})
      res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
}
