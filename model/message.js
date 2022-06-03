const mongoose = require("mongoose");

messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "must specify sender"],
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "must specify receiver"],
  },
  content: { type: String, required: [true, "message must have a content"] },
  createdAt: { type: Date, default: Date.now() },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
