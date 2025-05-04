const Conversation = require("../model/conversation.model");
const Message = require("../model/message.model.js");
const { getReceiverSocketId, io } = require("../socket/socket.js");
module.exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    //establishing the conversation if not started
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    //implement socket io for real time data
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); 
    }

    
    return res.status(200).json({ success: true, newMessage });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation)
      return res.status(200).json({ success: true, message: [] });
    return res
      .status(200)
      .json({ success: true, messages: conversation?.messages });
  } catch (error) {
    console.log(error);
  }
};
