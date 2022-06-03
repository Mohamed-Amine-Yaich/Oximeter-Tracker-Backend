const express = require("express");
const { append } = require('express/lib/response');
const router = express.Router({ mergeParams: true });
const messageContorller = require("./../controller/messageController");
const securityController = require("./../controller/securityController");
//message crud based on the message route and the id of the message

router.use(securityController.protected);



router
  .route("/")
  .post(securityController.restrictTo(["patient", "doctor"]),messageContorller.postMsg)
  .get(securityController.restrictTo(["patient", "doctor"]),messageContorller.gettMsg)
//router.route('/message/:idmsg').patch








router.use(securityController.restrictTo(["admin"]))

router
  .route("/")
  .get(messageContorller.getAllMessage)
  .post(messageContorller.postMessage);
router
  .route("/:id") //id of the message
  .get(messageContorller.getMessage)
  .patch(messageContorller.patchMessage)
  .delete(messageContorller.deleteMessage);

module.exports = router;
