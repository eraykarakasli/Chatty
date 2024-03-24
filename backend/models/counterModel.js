
const mongoose = require("mongoose");

const counterModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  counter: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", counterModel);

module.exports = Counter;
