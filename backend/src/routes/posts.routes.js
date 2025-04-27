const express = require("express")
const postController = require("../controllers/post.controller")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()
const likesController = require("../controllers/likes.controller")
router.post("/create" , authMiddleware,postController.createPost)
router.get("/getAllPosts",postController.getAll)
router.get("/:id",postController.fetchByUserId)
router.post("/like",likesController.LikePost);
module.exports = router