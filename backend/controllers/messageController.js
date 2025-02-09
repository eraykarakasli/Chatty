const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // İstemciden gelen sayfa numarası (varsayılan: 1)
    const pageSize = parseInt(req.query.pageSize) || 20; // İstemciden gelen sayfa boyutu (varsayılan: 20)

    const skip = (page - 1) * pageSize; // Atlamak için hesaplanan değer

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat")
      .sort({ createdAt: -1 })
      .skip(skip) // Belirli sayıda mesajı atla
      .limit(pageSize); // Belirli bir sayfa boyutunu aşmayacak şekilde mesajları al

    res.json(messages.reverse());
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});





module.exports = { sendMessage, allMessages };
