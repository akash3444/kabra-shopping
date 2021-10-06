const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    email: { type: String },
    profileUrl: { type: String },
    role: {
      type: String,
      enum: ["SHOP", "USER"],
    },
    username: { type: String },
    password: { type: String },
    language: { type: String },
    currency: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = userModel = mongoose.model("Users", userSchema);
