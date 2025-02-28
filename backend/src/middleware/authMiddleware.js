const jwt = require("jsonwebtoken");
const userModel = require("../model/userSchema");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token found" });
    }

    const decoded = jwt.verify(token, "auth-secret");

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
module.exports = authMiddleware;
