const { categoryModel, subCategoryModel } = require("../models");

const findAllQuery = async (query) => {
  let whereClause = { status: true };
  const data = await categoryModel.find(whereClause).sort({ createdAt: -1 });
  return data;
};

const subFindAllQuery = async (query) => {
  let whereClause = { status: true };
  if (query && query.categoryId) {
    whereClause = { ...whereClause, categoryId: query.categoryId };
  }
  console.log(whereClause);
  const data = await subCategoryModel.find(whereClause).sort({ createdAt: -1 });
  return data;
};

module.exports = {
  findAllQuery,
  subFindAllQuery,
};
