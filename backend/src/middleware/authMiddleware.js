const jwt = require("jsonwebtoken");
const userModel = require("../model/userSchema");

const authMiddleware = async (req, res, next) => {
  try {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
    if (!token) {
      console.log("no token provided")
      return res.status(401).json({ message: "Unauthorized, no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET ||  "auth-secret");

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
