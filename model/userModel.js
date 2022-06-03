const mongoose = require("mongoose");
//const email = require("email-valid-simple");
const validator = require("validator");
const bcrypt = require("bcrypt");
userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you must set a name"],
    },

    lastName: {
      type: String,
      required: [true, "you must set a name"],
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
      required: [true, "you must provide a password for your account"],
      select: "false",
    },

    confirmPassword: {
      type: String,
      minLength: 8,
      // required: [true,'you must confirm your password']
      select: "false",
      validate: {
        //condition de validatoin (cp === p)
        validator: function (val) {
          //validator true (confirm ) false (send validation error message)
          return val === this.password;
        },
        message: "passwords are not the same",
      },
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
      required: true,
    },
    matricule: {
      type: String,
      required: [
        function () {
          return this.role === "doctor";
        },
        "if user is a doctor you must have a matricule",
      ],
    },
    device: {
      type: String,
      required: [
        function () {
          return this.role === "patient";
        },
        "each user must specify a device",
      ],
    },

    //trying to imlemnt child referencing
    //not working because we must put a list of patient id in doctor

    //patientList:[{type : mongoose.Schema.ObjectId,ref:'User'}],

    doctor: {
      type: String,
      required: [
        function () {
          return this.role === "patient";
        },
        "patient must have a doctor",
      ],
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: String,
      default: true,
    },
    //credit card (for paying the doctor per month (the prince of the app include)..)
    //doctor:[ id of the doctor] referencing cause we can change doctor and we can query for each one alone

    //spo2 :value
    //weight
    //bpm
    //les pas
  },
  {
    //to output the virtual that are not store in the db
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//test for chield ref and
//child referencing to =>create a doctor with specifying the id
//when creating a patient the patient is not added
/* userSchema.pre(/^find/, function (next) {
  this.populate({ path: "patientList" });
  next();
});
 */

//virtual populate for populate the list of patient when query for doctor
/////** */
userSchema.virtual("patientList", {
  ref: "User",
  foreignField: "doctor",
  localField: "_id",
});

userSchema.pre("findOne", async function (next) {
  //prob list patient is populate when query for user and doctor
  this.populate("patientList");

  next();
});
/*** */
//removing the confirmPassword field before saving in db
userSchema.pre("save", async function (next) {
  //crypting the pass and removing the field of confirmePass from db
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  this.confirmPassword = undefined;
  if (this.role === "patient" || this.role === "admin")
    this.patientList = undefined;
  if (this.isModified("password") || !this.isNew)
    this.passwordChangedAt = Date.now();

  next();
});

/* userSchema.post("save", async function () {
  console.log(this);
  if (this.role === "patient") {
    const idDoctor = this.doctor;
    const doctor = await User.findById(idDoctor);

    console.log("doctor" + doctor);

    if (doctor) {
      doctor.patientList.push(this);
      doctor.save(/* { validatorBeforeSave: false } */ /*);
  /*  } else {
      console.log("no doctor with this id");
    }
  }
}); */

///before(for update the list of patient inside the doctor)
/* userSchema.pre(/^findOneAndDelete/, async function () {
  const deletedPatient = await this.model.findOne(this.getQuery());
  console.log(deletedPatient);
  const doctorid = deletedPatient.doctor;
  const doc = await User.findById(doctorid);
  doc.patientList.forEach((element, idx) => {
    if (element === deletedPatient) {
      patientList.splice(idx, 1);
    }
  });

  next();
}); */

//after(to verify that the patient has been removed for updating it )
// post findOneAndDelete
// pass the object in this variable for removing the object from the doctor patient list

userSchema.methods.verifyPassword = async (candidatePass, userPass) => {
  console.log(candidatePass);
  console.log(userPass);

  console.log(await bcrypt.compare(candidatePass, userPass));
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.verifyTokenTime = (tokenIat, passwordChangedAt) => {
  console.log(passwordChangedAt);
  const convertedPass = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  console.log(convertedPass);
  return tokenIat > convertedPass;

  // cause there is time in passowrdChangedAt must relogin
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
