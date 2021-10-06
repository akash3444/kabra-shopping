const _ = require("lodash");
const multer = require("multer");
const { cartModel } = require("../models");
const { userService } = require("../mongoServices");
const { generateJWTToken, comparePassword } = require("../utils");

const login = async (req, res) => {
  try {
    const { body } = req;
    const { username, password } = body;

    // Check username Exists or Not
    const checkUser = await userService.userQuery({ username });
    if (!checkUser)
      throw new Error(`${username} Not Found. Please Register with Us!`);

    if (checkUser) {
      const { _id, name, email, role, username, language, currency, isActive } =
        checkUser;

      if (!isActive) {
        throw new Error("Your Account is Temporary Deactivated.");
      }

      let verifyPassword = await comparePassword(password, checkUser.password);

      if (!verifyPassword) throw new Error("Username or Password is incorrect");

      // Generate JWT
      const token = generateJWTToken(_id);
      const data = {
        token,
        _id,
        role,
        name,
        email,
        language,
        currency,
      };
      if (checkUser.role == "USER") {
        const cart = await cartModel.aggregate([
          { $match: { userId: _id } },
          { $project: { count: { $size: "$products" } } },
        ]);
        data.cartCount =
          cart && cart.length && cart[0].count ? cart[0].count : 0;
      }
      res.status(200).send({
        success: true,
        data,
        message: `${name} Login Successfully`,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
