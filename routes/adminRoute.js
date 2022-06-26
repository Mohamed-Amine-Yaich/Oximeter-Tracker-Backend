const userController = require("../controller/userController");

const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAll)/* .post(userController.postAdmin); */
/* router
  .route("/:id")
  .get(userController.getAdmin)
  .patch(userController.updateAdmin)
  .delete(userController.deleteAdmin); */

module.exports = router;
