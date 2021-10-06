const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategories",
    },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

module.exports = productModel = mongoose.model("Products", productSchema);
