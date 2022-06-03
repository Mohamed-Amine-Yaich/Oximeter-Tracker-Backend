const express = require("express");
const router = express.Router();

const doctorController = require("./../controller/doctorController");
const userController = require("./../controller/userController");

const securityController = require("./../controller/securityController");



/* router.route("/").get(doctorController.getAllPatient).patch(doctorController.updateDoctor)
//get a patient
//cant get one form the factory must make a handler in doctor controller
router.route("/:id").get(userController.getUser)

 */



/* router
  .route("/")
  .get(doctorController.getAllDoctor)
  .post(doctorController.postDoctor);

router
  .route("/:id")
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

 */

module.exports = router;
