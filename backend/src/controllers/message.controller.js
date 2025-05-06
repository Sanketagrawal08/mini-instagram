const messageModel = require("../model/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");
module.exports.getMessages = async (req, res) => {
  try {
    const  receiverId  = req.params.id;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });
    // $or operator is used to match documents that satisfy at least one of the specified conditions.

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const  receiverId  = req.params.id;
    const senderId = req.user._id;

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      // getReceiverSocketId function se socket id milta he
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
