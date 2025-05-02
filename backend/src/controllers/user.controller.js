const userModel = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { MongoGridFSChunkError } = require("mongodb");

module.exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists with this email!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "auth-secret"
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully!",
    user: user,
    token: token,
    success: true,
  });
};
module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await userModel.findOne({ email });

  if (!isExist) {
    console.log("User not found for email:", email);
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, isExist.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Paasword" });
  }

  const token = jwt.sign(
    {
      id: isExist._id,
      email: isExist.email,
    },
    process.env.JWT_SECRET || "auth-secret"
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ isExist, message: "login successfull", token: token });
};

module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  console.log(users);
  res.status(200).json({ message: "All Users", users });
};
module.exports.updateController = async (req, res) => {
  const { ImageUrl } = req.body;
  console.log(ImageUrl);
};

module.exports.followUser = async (req, res) => {
  const currentUser = await userModel.findById(req.body.currentLoggedInuserId);
  const userToFollow = await userModel.findById(req.params.id);

  if (currentUser === userToFollow) {
    return res.status(404).json({ message: "You can't follow yourself" });
  }
  try {
    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();

      currentUser.following.push(userToFollow._id);
      await currentUser.save();

      res.status(200).json("User has been followed");
    } else {
      res.status(400).json("Already following");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.UnfollowUser = async (req, res) => {
  

  try {
    const currentUser = await userModel.findById(
      req.body.currentLoggedInuserId
    );
    const userToUnfollow = await userModel.findById(req.params.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json("User not found");
    }

    // Remove from followers
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    // Remove from following
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );
    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json("User unfollowed successfully");
  } catch (err) {
    res.status(500).json("Server error");
  }
};
module.exports.getFollower = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel
      .findById(userId)
      .populate("followers", "username email");
    if (!user) return res.status(404).json("User not found");
    const followerCount = user.followers.length;
    res.status(200).json({
        message: "Followers",
        followers: user.followers,
        followerCount: followerCount,
      });
  } catch (error) {
    res.status(500).json("Server error");
  }
};
module.exports.getFollowing = async (req, res) => {
  try {
   
    const user = await userModel
      .findById(req.params.id)
      .populate("following", "username email");
    if (!user) return res.status(404).json("User not found");
    const followingCount = user.following.length;
    res.status(200).json({message:"following",following:user.following,followingCount:followingCount});
  } catch (err) {
    res.status(500).json("Server error");
  }
};
