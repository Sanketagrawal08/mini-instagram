const express = require("express");
const router = express.Router();
const messageModel = require("../model/message.model");
const { getMessages, sendMessage } = require("../controllers/message.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send/:id",authMiddleware, sendMessage);
router.get("/receive/:id", authMiddleware, getMessages);


module.exports = router;
