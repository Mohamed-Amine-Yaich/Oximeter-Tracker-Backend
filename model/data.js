const mongoose = require("mongoose");

dataSchema = mongoose.Schema({
  idpatient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "id of patient is required"],
  },
  spo2: {
    type: Number,
    required: [true, "spo2 is required"],
  },
  heart: { type: Number, required: [true, "message must have a content"] },
  pi: {
    type: Number,
    required: [true, "pi is required"],
  },
  createdAt: { type: Date, default: Date.now() },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
