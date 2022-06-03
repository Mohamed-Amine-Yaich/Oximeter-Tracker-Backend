const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must have a name"],
  },
  lastName: {
    type: String,
    required: [true, "must have a lastName"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "you must provide an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, "must have a password"],
    select: false,
  },
  matricule: {
    type: String,
  },

  discriptione: {
    type: String,
  },

  //patient :[ids,....]
  //credit card (for getting payed for his offer )
  // ratings (base on experience or based on opinion of other patient)
  //price per month ( how have more experience and better ratings are heigher payed)
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
