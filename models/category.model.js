const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = mongoose.Schema(
  {
    CategoryName: { type: String, require: true },
    Prefix: { type: String },
  },
  { collection: "Category", timestamps: true }
);

CategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", CategorySchema);
