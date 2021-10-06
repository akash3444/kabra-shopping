const { productModel } = require("../models");
const { PORT, HOST } = require("../utils/env");

const findAllQuery = async (query) => {
  let whereClause = {
    status: true,
    isDeleted: false,
  };
  if (query && query.currentUserId) {
    whereClause = { ...whereClause, userId: query.currentUserId };
  }
  let data = await productModel
    .find(whereClause)
    .populate({
      path: "userId",
      select: "name currency",
      model: "Users",
    })
    .populate({
      path: "categoryId",
      select: "name",
      model: "Categories",
    })
    .populate({
      path: "subCategoryId",
      select: "name",
      model: "subCategories",
    })
    .sort({ createdAt: -1 });
  data = await data.map((doc) => {
    doc.image = `http://${HOST}:${PORT}/${doc.image}`;
    return doc;
  });
  return data;
};

const findSingleQuery = async (query) => {
  let whereClause = {
    _id: query.productId,
  };
  const data = await productModel
    .findOne(whereClause)
    .populate({
      path: "userId",
      select: "name currency",
      model: "Users",
    })
    .populate({
      path: "categoryId",
      select: "name",
      model: "Categories",
    })
    .populate({
      path: "subCategoryId",
      select: "name",
      model: "subCategories",
    });
  return data;
};

module.exports = {
  findAllQuery,
  findSingleQuery,
};
