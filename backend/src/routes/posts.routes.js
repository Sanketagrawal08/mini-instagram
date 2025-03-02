const express = require("express")
const postController = require("../controllers/post.controller")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/create" , authMiddleware,postController.createPost)
router.get("/getAllPosts",postController.getAll)
router.get("/:id",postController.fetchByUserId)

module.exports = router