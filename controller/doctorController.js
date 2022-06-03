const User = require("./../model/userModel");
const factory = require("./factory");

/* exports.postDoctor = factory.createOne(Doctor);
exports.getAllDoctor = factory.getAll(Doctor);
exports.getDoctor = factory.getOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.deleteDoctor = factory.deleteOne(Doctor); */

/* exports.getAllPatient = async (req, res, next) => {
  console.log("from doctor controller");
  const doctorId = req.user._id;
  const doctor = await User.findById(doctorId);
  res.status(200).json({
    status: "success you pass",
    data: { patientList: doctor.patientList },
  });
};

exports.updateDoctor = async (req, res, next) => {
  console.log("updating doctor");
  const doctorId = req.user._id;
  const updatedFields = req.body;
  const doctor = await User.findByIdAndUpdate(
    doctorId,
    { updatedFields },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success you pass",
    data: doctor,
  });
};
  */
//exports.getPatient = async (req, res, next) => {};
