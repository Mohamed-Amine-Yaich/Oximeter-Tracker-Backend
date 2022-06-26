const Data = require("./../model/data");
const factory = require("./factory");

exports.postData = async function (req, res, next) {
  const doc = await Data.create({
    idpatient: req.user.id,
    ...req.body,
  });
  res.status(200).json({
    status: "sucess ",
    data: doc,
  });
};

exports.getDataForUser = async (req, res, next) => {
  console.log("getting data");
  const userData = await Data.find({ idpatient: req.user.id });
  res.status(200).json({
    status: "sucess ",
    length: userData.length,
    data: userData,
  });
};
exports.deleteAll = async (req, res) => {
  const response = await Data.deleteMany();

  res.status(200).json({
    status: "sucess ",
  });
};
