const Joi = require("joi");

const { validateRequest } = require("../middleware");

function loginSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(25).required(),
  });
  validateRequest(req, res, next, schema);
}

const addProductSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
  subCategoryId: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  status: Joi.string().required(),
});

function addToCartSchema(req, res, next) {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = {
  loginSchema,
  addProductSchema,
  addToCartSchema,
};
