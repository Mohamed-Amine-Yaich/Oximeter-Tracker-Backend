const adminController = require("../controller/adminController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(adminController.getAllAdmin)
  .post(adminController.postAdmin);
router
  .route("/:id")
  .get(adminController.getAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
