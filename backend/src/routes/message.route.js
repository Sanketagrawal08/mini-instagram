const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { sendMessage, getMessage } = require("../controllers/message.controller");

const router = express.Router()

router.post("/send/:id", authMiddleware, sendMessage)
router.get("/receive/:id", authMiddleware, getMessage)

module.exports = router;
