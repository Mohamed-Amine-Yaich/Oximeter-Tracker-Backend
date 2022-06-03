const Admin = require("./../model/adminModel");
const factory = require("./factory");

exports.postAdmin = factory.createOne(Admin);
exports.getAllAdmin = factory.getAll(Admin);
exports.getAdmin = factory.getOne(Admin);
exports.updateAdmin = factory.updateOne(Admin);
exports.deleteAdmin = factory.deleteOne(Admin);
