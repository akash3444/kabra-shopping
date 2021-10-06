const { categoryService } = require("../mongoServices");
const { isMongoDBId } = require("../utils");

const getAllCategories = async (req, res) => {
  try {
    const data = await categoryService.findAllQuery();
    res.status(200).send({
      statusCode: 200,
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

const getSubCaregory = async (req, res) => {
  try {
    const { params } = req;
    const { categoryId } = params;

    const checkCategoryId = isMongoDBId(categoryId);
    if (!checkCategoryId) throw new Error("Enter Valid Category ID.");

    const data = await categoryService.subFindAllQuery({ categoryId });

    res.status(200).send({
      statusCode: 200,
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
  getAllCategories,
  getSubCaregory,
};
