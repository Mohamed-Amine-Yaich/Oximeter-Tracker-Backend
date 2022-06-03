const User = require("./../model/userModel");
const factory = require("./factory");
const createError = require("http-errors");

exports.createUser = factory.createOne(User);
exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

const sendResponse = (response, document, message) => {
  response.status(200).json({
    status: "sucess ",
    message: message,
    length: document.length,
    data: document,
  });
};
//doctor get himself and patient
exports.getOne = async (req, res, next) => {
  console.log("get one");
  if (req.user.role === "doctor") {
    console.log("hello" + req.user);

    const tabIds = req.user.patientList.map(el => {
      return el.id;
    });
    console.log("hh" + tabIds.includes(req.params.id));
    console.log(!req.user.patientList.includes(req.params.id));
    if (!tabIds.includes(req.params.id))
      next(createError("this patient is not found "));

    const patient = await User.findById(req.params.id);

    sendResponse(res, patient);
  } else if (req.user.role === "patient") {
    const doc = await User.findById(req.params.id);
    //if you want the patient to see the list of doctor patient
    doc.patientList = undefined;
    if (!(doc.role === "doctor"))
      next(createError("please contact your doctor "));

    sendResponse(res, doc);
  }
};

exports.getAll = async (req, res, next) => {
  console.log("get all ");

  if (req.user.role === "doctor") {
    const doctorId = req.user._id;
    const doctor = await User.findById(doctorId);

    const patientList = req.user.patientList;

    sendResponse(res, patientList);
  } else if (req.user.role === "patient") {
    const doc = await User.find({ role: "doctor" });
    sendResponse(res, doc);
  }
};

exports.getMe = async (req, res, next) => {
  console.log(" get me handler");
  //if doctor return doctor with his patietn list
  sendResponse(res, req.user, "this is your data");
};

exports.deleteMe = async (req, res, next) => {
  console.log(" delete me handler");
  await User.findByIdAndUpdate(
    req.user._id,
    { active: "false" },
    { new: true }
  );
  sendResponse(res, 0, "your account has been deleted");
};

exports.updateMe = async (req, res, next) => {
  console.log(" update me handler");
  //1/you cant change your password here
  //2/email name last name , device ,(doctor for patient )
  //3/send updated data
  if (req.body.password || req.body.passwordConfirm) {
    next(createError("you cant change your pass here", 400));
  }
  // const asArray = Object.entries(obj);
  //update doctor is not allowed
  //set a specific route when we get all doctor you can selecet a doctor that you want to deal with
  //or not possible feature
  const allowedField = ["email", "name", "lastName", "device"];
  const filtredBody = {};
  //props of object
  Object.keys(req.body).forEach(el => {
    console.log("res.body keys : " + el);
    if (allowedField.includes(el)) {
      //  console.log("allowed el"+el);
      //create in the new object a prop with the same name and the same val
      filtredBody[el] = req.body[el];
      //  console.log(filtredBody);
    }
  });

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filtredBody, {
    new: true,
  });

  sendResponse(res, updatedUser, "your data has been updated successfully");
};
