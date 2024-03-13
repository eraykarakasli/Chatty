const mongoose = require("mongoose");

const quickModel = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quick = mongoose.model("Quick", quickModel);

module.exports = Quick;
