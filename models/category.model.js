const mongoose = require("../config/connectDB");

const CategorySchema = mongoose.Schema(
  {
    CategoryName: { type: String, require: true },
    Prefix: { type: String },
  },
  { collection: "Category", timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
