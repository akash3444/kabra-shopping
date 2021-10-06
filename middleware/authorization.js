const { userModel } = require("../models");
const verifyJWTToken = require("../utils/verifyJWTToken");
const authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");
    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;
    const verifyToken = verifyJWTToken(token);
    if (!verifyToken) throw new Error("Invalid Token");

    const user = await userModel.findOne({ _id: verifyToken.sub });
    if (!user) throw new Error("No User Found With That Token");
    if (!user.isActive) throw new Error("Unauthorized");
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authorization;
