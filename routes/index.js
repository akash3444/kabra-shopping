const express = require("express");
const userRoute = require("./user.routes");
const productRoute = require("./product.routes");
const categoryRoute = require("./category.routes");

const { BASE_API_URL } = require("../utils/env");

const router = express.Router();

const defaultRoutes = [
  {
    route: userRoute,
  },
  {
    route: productRoute,
  },
  {
    route: categoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(BASE_API_URL, route.route);
});

module.exports = router;
