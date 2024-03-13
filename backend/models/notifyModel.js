const mongoose = require("mongoose");

const notifyModel = mongoose.Schema({
  chatName: {
    type: String,
    required: true,
  },
  messageId: { // messageId olarak değiştirildi
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  isGroupChat: {
    type: Boolean,
    required: true,
  },
  latestMessage: {
    chat: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
  },
  users: { 
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
});

const Notify = mongoose.model("Notify", notifyModel);

module.exports = Notify;
