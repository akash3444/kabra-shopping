const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");
const { authorize } = require("../middleware");
const { validationSchema } = require("../joiSchema");

router.use(function timeLog(req, res, next) {
  console.log("Product Route file: ", Date.now());
  next();
});

router.route("/product/list").get(authorize, productController.getProduct);

router.route("/product/add").post(authorize, productController.addProduct);

router
  .route("/product/single/:productId")
  .get(authorize, productController.singleProduct);

router
  .route("/product/update/:productId")
  .put(authorize, productController.updateProduct);

router
  .route("/product/delete/:productId")
  .delete(authorize, productController.deleteProduct);

router.route("/product/all").get(productController.getAllProduct);

router
  .route("/product/addToCart")
  .post(
    validationSchema.addToCartSchema,
    authorize,
    productController.addToCart
  );

router
  .route("/product/placeOrder")
  .post(authorize, productController.placeOrder);

router
  .route("/product/getCartCount")
  .get(authorize, productController.getCartCount);

module.exports = router;
