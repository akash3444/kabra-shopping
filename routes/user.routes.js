const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");

router.use(function timeLog(req, res, next) {
  console.log("User Route file: ", Date.now());
  next();
});

router
  .route("/users/login")
  .post(validationSchema.loginSchema, userController.login);

module.exports = router;
