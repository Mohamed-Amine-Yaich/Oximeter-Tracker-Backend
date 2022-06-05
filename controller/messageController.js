const mongoose = require("mongoose");
const { parse } = require("dotenv");
const createError = require("http-errors");
const User = require("../model/userModel");
const Message = require("./../model/message");
const factory = require("./factory");

exports.postMessage = factory.createOne(Message);
exports.getAllMessage = factory.getAll(Message);
exports.getMessage = factory.getOne(Message);
exports.patchMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);

const sendResponse = (response, document) => {
  response.status(200).json({
    status: "sucess ",
    length: document.length,
    data: { document: document },
  });
};

/* if (req.user.role === "doctor") {
    const doctorId = req.user._id;
    const doctor = await User.findById(doctorId);
    if (!doctor.patientList.includes(req.params.id))
      next(createError("this patient is not found")); */

/* /users/receiver/:id */
exports.postMsg = async (req, res, next) => {
  if (req.user.role === "doctor") {
    const patientIds = req.user.patientList.map(el => {
      console.log(el.id);
      return el.id === req.params.id;
    });
    console.log(req.params.id);
    console.log("patientIds : " + patientIds);

    console.log(patientIds.includes(true));

    if (!patientIds.includes(true)) {
      next(createError("this user does not includes in your patient list"));
    }
  }
  if (req.user.role === "patient") {
    if (!(req.params.id === req.user.doctor))
      next(createError("please contact your doctor"));
  }

  const message = Message.create({
    sender: req.user._id,
    receiver: req.params.id,
    /*   sender: req.body.sender,
    receiver :req.body.receiver, */
    content: req.body.content,
  });

  sendResponse(res, message);
};

/* get Msg for patient and another for user */
exports.gettMsg = async (req, res, next) => {
  //$or:[{ a: 1 }, { b: 1 }];
  //patient loged
  if (req.user.role === "patient") {
    /*    if (req.params.id === req.user.id)
      next(createError("you cant send message to yourself", 401)); */
    const query = {
      /* query for all message that user either sender or receiver
       */
      /*  $or: [{ sender: req.user._id }, { receiver: req.user._id }] ,*/
      /* for the patient we must query for the message between him and his doctor
     in case we change the doctor we must not query for the old message between him and the other doctor */
      $or: [
        { $and: [{ sender: req.user._id }, { receiver: req.user.doctor }] },
        { $and: [{ sender: req.user.doctor }, { receiver: req.user._id }] },
      ],
    };
    const messages = await Message.find(query);
    sendResponse(res, messages);
  }

  /*   $and: [
    { $or: [{a: 1}, {b: 1}] },
    { $or: [{c: 1}, {d: 1}] }
] */
  if (req.user.role === "doctor") {
    const query = {
      $or: [
        { $and: [{ sender: req.user._id }, { receiver: req.params.id }] },
        { $and: [{ sender: req.params.id }, { receiver: req.user._id }] },
      ],
    };
    const messages = await Message.find(query);
    sendResponse(res, messages);
  }
};
