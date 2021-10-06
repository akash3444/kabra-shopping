const { productService } = require("../mongoServices");
const { productModel, cartModel, orderModel } = require("../models");
const { isMongoDBId, multerConfig } = require("../utils");
const { PORT, HOST } = require("../utils/env");
const _ = require("lodash");
const get = require("lodash/get");

const {
  validationSchema: { addProductSchema },
} = require("../joiSchema");

const getProduct = async (req, res) => {
  const { currentUser } = req;
  const { _id, role } = currentUser;
  if (role && role == "USER")
    throw new Error("You are not permitted to perform this action.");

  const getAll = await productService.findAllQuery({ currentUserId: _id });

  res.status(200).send({
    success: true,
    data: getAll,
  });
};

const addProduct = async (req, res) => {
  try {
    const field = "image";
    const upload = multerConfig.upload.single(field);

    upload(req, res, async (err) => {
      try {
        const { file, body, currentUser } = req;
        const { _id, role } = currentUser;
        if (role && role == "USER")
          throw new Error("You are not permitted to perform this action.");

        if (!file) throw new Error("Please select product image");

        const { error, value } = addProductSchema.validate(body);
        if (error)
          throw new Error(
            `Validation error: ${error.details
              .map(function (elem) {
                return elem.message;
              })
              .join(", ")}`
          );
        const imageURL = file.filename;

        const categoryId = isMongoDBId(value.categoryId);
        if (!categoryId) throw new Error("Enter Valid Category ID.");

        const subCategoryId = isMongoDBId(value.subCategoryId);
        if (!subCategoryId) throw new Error("Enter Valid  sub Category ID.");

        let productData = {
          userId: currentUser._id,
          productName: value.name,
          categoryId: value.categoryId,
          subCategoryId: value.subCategoryId,
          description: value.description,
          price: value.price,
          status: value.status,
          image: imageURL,
        };
        const createProduct = new productModel(productData);
        createProduct.save();
        res.status(200).send({
          success: true,
          message: "Product Created Successfully",
          data: createProduct,
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { currentUser, params } = req;
    const { _id } = currentUser;
    const { productId } = params;

    const checkProductId = isMongoDBId(productId);
    if (!checkProductId) throw new Error("Enter Valid Product ID.");

    const getOne = await productService.findSingleQuery({
      productId,
    });
    if (!getOne) throw new Error("Product not found!");
    if (getOne.image) {
      getOne.image = `http://${HOST}:${PORT}/${getOne.image}`;
    }
    res.status(200).send({
      success: true,
      data: getOne,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const field = "image";
    const upload = multerConfig.upload.single(field);

    upload(req, res, async (err) => {
      try {
        const { file, body, currentUser, params } = req;
        const { _id, role } = currentUser;
        if (role && role == "USER")
          throw new Error("You are not permitted to perform this action.");
        const { productId } = params;

        const checkProductId = isMongoDBId(productId);
        if (!checkProductId) throw new Error("Enter Valid Product ID.");

        let getOne = await productModel.findOne({
          userId: _id,
          _id: productId,
        });
        if (!getOne) throw new Error("Product not found!");

        const { error, value } = addProductSchema.validate(body);
        if (error)
          throw new Error(
            `Validation error: ${error.details
              .map(function (elem) {
                return elem.message;
              })
              .join(", ")}`
          );

        if (file) {
          var imageURL = file.filename;
        }

        const categoryId = isMongoDBId(value.categoryId);
        if (!categoryId) throw new Error("Enter Valid Category ID.");

        const subCategoryId = isMongoDBId(value.subCategoryId);
        if (!subCategoryId) throw new Error("Enter Valid  sub Category ID.");

        getOne = await _.merge(getOne, value);
        if (value.name) {
          getOne.productName = value.name;
        }
        if (imageURL) {
          getOne.image = imageURL;
        }
        getOne.save();
        res.status(200).send({
          success: true,
          message: "Product Updated Successfully",
          data: getOne,
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { currentUser, params } = req;
    const { productId } = params;

    const { _id, role } = currentUser;
    if (role && role == "USER")
      throw new Error("You are not permitted to perform this action.");

    const checkProductId = isMongoDBId(productId);
    if (!checkProductId) throw new Error("Enter Valid Product ID.");

    const getDelete = await productModel.findOneAndDelete({
      userId: _id,
      _id: productId,
    });
    if (!getDelete) throw new Error("Product not found!");

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  const { currentUser } = req;
  if (currentUser) {
    const { _id, role } = currentUser;
    if (role && role == "USER")
      throw new Error("You are not permitted to perform this action.");
  }

  const getAll = await productService.findAllQuery();

  res.status(200).send({
    success: true,
    data: getAll,
  });
};

const addToCart = async (req, res) => {
  try {
    const { currentUser, body } = req;
    const { productId, quantity } = body;
    let message = "Added in cart successfully";
    const checkProductId = isMongoDBId(productId);
    if (!checkProductId) throw new Error("Enter Valid Product ID.");

    const getOne = await productModel.findById(productId, {
      _id: 1,
      userId: 1,
      price: 1,
    });
    if (!getOne) throw new Error("Product not found!");

    let cart = await cartModel.findOne({ userId: currentUser._id });
    if (cart) {
      let itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() == productId
      );
      if (itemIndex > -1) {
        if (quantity == 0) {
          cart.products.splice(itemIndex, 1);
        } else {
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        }
      } else {
        if (quantity == 0) throw new Error("Please select quantity.");
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, price: getOne.price });
      }
      cart = await cart.save();
    } else {
      let cartData = {
        userId: currentUser._id,
        products: [
          {
            productId: getOne._id,
            price: getOne.price,
            quantity: quantity,
          },
        ],
      };
      const create = new cartModel(cartData);
      create.save();
    }

    res.status(200).send({
      success: true,
      message,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { currentUser } = req;

    const cart = await cartModel.findOne({ userId: currentUser._id });

    if (!cart) throw new Error("Cart empty");

    if (cart) {
      const totalAmount = await cart.products.reduce(function (a, c) {
        return a + c.price * c.quantity;
      }, 0);
      const orderData = {
        userId: currentUser._id,
        products: cart.products,
        total: totalAmount,
        tax: 0,
      };
      orderData.grandTotal = orderData.tax + orderData.total;
      const create = new orderModel(orderData);
      create.save();
      if (!create) throw new Error("Somthing went to wrong");

      const deleteCart = await cartModel.deleteOne({ _id: cart._id });
      res.status(200).send({
        success: true,
        message: "Order place successfully",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getCartCount = async (req, res) => {
  try {
    const { currentUser } = req;
    const { _id } = currentUser;

    const cart = await cartModel.aggregate([
      { $match: { userId: _id } },
      { $project: { count: { $size: "$products" } } },
    ]);
    const data = {
      cartCount: cart && cart.length && cart[0].count ? cart[0].count : 0,
    };
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProduct,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  addToCart,
  placeOrder,
  getCartCount,
};
