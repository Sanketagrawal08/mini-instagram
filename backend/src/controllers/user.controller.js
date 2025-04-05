const userModel = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

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
    maxAge: 24 * 60 * 60 * 1000
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
    "auth-secret"
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ isExist, message: "login successfull",token:token });
};
