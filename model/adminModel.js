const mongoose = require("mongoose");
const validator = require('validator')

const adminSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: [true, "you must provide an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "must have a password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "subAdmin"],
    default: "subAdmin",
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
