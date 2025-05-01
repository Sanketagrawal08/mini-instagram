const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/userProfile", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/getallusers", userController.getAllUsers);
router.put("/update-profile", userController.updateController);
router.post("/:id/follow", authMiddleware, userController.followUser)
router.post("/:id/unfollow", authMiddleware, userController.UnfollowUser)
router.get("/:id/getfollower",userController.getFollower)
router.get("/:id/getfollowing",userController.getFollowing)
module.exports = router;
