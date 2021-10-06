const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        price: { type: Number },
        quantity: { type: Number, default: 0 },
      },
    ],
    total: { type: Number },
    tax: { type: Number },
    grandTotal: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

module.exports = productModel = mongoose.model("Orders", orderSchema);
