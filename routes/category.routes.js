const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { authorize } = require("../middleware");

router.use(function timeLog(req, res, next) {
  next();
});

router.route("/categories").get(authorize, categoryController.getAllCategories);

router
  .route("/categories/sub/:categoryId")
  .get(authorize, categoryController.getSubCaregory);

module.exports = router;
