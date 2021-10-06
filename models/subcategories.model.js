const mongoose = require("mongoose");

const subCategory = new mongoose.Schema(
  {
    name: { type: String, index: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
subCategory.set("toObject", { virtuals: true });
subCategory.set("toJSON", { virtuals: true });

module.exports = subCategoryModel = mongoose.model(
  "subCategories",
  subCategory
);
