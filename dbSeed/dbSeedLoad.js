const chalk = require("chalk");
const { userModel, categoryModel, subCategoryModel } = require("../models");
const users = require("./JSONData/users.json");
const categories = require("./JSONData/category.json");
const subCategories = require("./JSONData/subCategory.json");
const { hashPassword } = require("../utils");

const seedUsers = async (data) => {
  try {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const checkUser = await userModel.findOne({
        email: element.email,
      });
      if (!checkUser) {
        element.password = await hashPassword(element.password);
        const userData = new userModel(element);
        await userData.save();
        console.info(chalk.greenBright("Sowing seed completed for User"));
      }
    }
    console.info(chalk.greenBright("User Added"));
  } catch (error) {
    console.error(chalk.redBright("error", error.message));
    return;
  }
};

const seedCategories = async (data) => {
  try {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const checkCategory = await categoryModel.findOne({
        name: element.name,
      });
      if (!checkCategory) {
        const categoryData = new categoryModel(element);
        await categoryData.save();
        console.info(chalk.greenBright("Sowing seed completed for Category"));
      }
    }
    console.info(chalk.greenBright("Category Added"));
  } catch (error) {
    console.error(chalk.redBright("error", error.message));
    return;
  }
};

const seedsubCategories = async (data) => {
  try {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const checkCategory = await subCategoryModel.findOne({
        name: element.name,
      });
      if (!checkCategory) {
        let category = await categoryModel.aggregate([
          { $sample: { size: 1 } },
          { $project: { _id: 1 } },
        ]);

        const subCategoryData = new subCategoryModel(element);
        subCategoryData.categoryId = category[0]._id;
        await subCategoryData.save();
        console.info(
          chalk.greenBright("Sowing seed completed for Sub Category")
        );
      }
    }
    console.info(chalk.greenBright("Sub Category Added"));
  } catch (error) {
    console.error(chalk.redBright("error", error.message));
    return;
  }
};

(async () => {
  setTimeout(async () => {
    await seedUsers(users);
    await seedCategories(categories);
    await seedsubCategories(subCategories);
  }, 1000);
})();
