const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

module.exports = categoryModel = mongoose.model("Categories", categorySchema);
