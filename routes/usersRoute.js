var express = require("express");
var router = express.Router();

//const User = require("../model/userModel");
const userController = require("../controller/userController");
const securityController = require("./../controller/securityController");
//const { route } = require('./doctorRoute');
const doctorRoute = require("./doctorRoute");
const messageRoute = require("./messageRoute");

/* GET users listing. */

//this for creating user
//you can
router.route("/signup").post(securityController.signup);
router.route("/login").post(securityController.login);

//forget and reset password pass based on email
//?????

//////////////////////////////////////////////////////////////
router.use(securityController.protected);

//redirect to message route
router.use("/receiver/:id", messageRoute);

//1)update me

router.patch("/updateMe", userController.updateMe);
//2update his password (securitey)
router.patch("/updatePassowrd", securityController.updatePassword);
//3)delete me(active false )
router.route("/deleteMe").patch(userController.deleteMe);

//4)get me

router.get("/getMe", userController.getMe);

//done )get all users (for doctor )
//get one) incule himself the doctor

//////////////////////////////////////////////////////////////
//this route are only to admin
//router.use(securityController.restrictTo(["admin", "doctor"]));

//doctor posible query
//get his patient
//get a particular patient
//get himself
//patch his data
//delete a patient (inactive)
//delete his account (inactive)
//message between (his and his patient)

//patient possible query
//+alldoctor
//+one doctor
//send message to his doctor
//get all message
//delete message that he send
//update messages
//desactive his acount
//change the doctor

router
  .route("/")
  .get(
    securityController.restrictTo(["doctor", "patient"]),
    userController.getAll
  );

router
  .route("/:id")
  .get(
    securityController.restrictTo(["doctor", "patient"]),
    userController.getOne
  ); //when a patient query for a doctor he see the patient list

router.use(securityController.restrictTo(["admin"]));

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser); //usless cause user must singup remove

//test the protect like a handler
//router.route("/protected").get(securityController.protected);

router
  .route("/:id")
  .get(userController.getUser)

  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
