const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        price: { type: Number },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });

module.exports = productModel = mongoose.model("Carts", cartSchema);
