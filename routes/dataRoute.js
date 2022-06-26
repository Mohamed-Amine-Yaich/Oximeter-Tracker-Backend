const dataController = require("../controller/dataController");
const securityController = require("./../controller/securityController");

const express = require("express");
const router = express.Router();

router.use(securityController.protected);

router
  .route("/")
  .get(dataController.getDataForUser)
  .post(securityController.restrictTo(["patient"]), dataController.postData)
  .delete(securityController.restrictTo(["admin"]), dataController.deleteAll);
module.exports = router;
