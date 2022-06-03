//createone is a handler (callback)

exports.createOne = Model =>
  async function (req, res, next) {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: "sucess ",
      data: doc,
    });
  };

exports.getAll = Model => async (req, res, next) => {
  const docs = await Model.find();
  res.status(200).json({
    status: "sucess ",
    length: docs.length,
    data: docs,
  });
};

exports.getOne = Model => async (req, res, next) => {
  const doc = await Model.findById(req.params.id);

  res.status(200).json({
    status: "sucess ",
    data: doc,
  });
};

exports.updateOne = Model => async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.deleteOne = Model => async (req, res, next) => {
  const id = req.params.id;
  await Model.findByIdAndDelete({ _id: id });
  res.status(200).json({
    status: "sucess ",
  });
};
