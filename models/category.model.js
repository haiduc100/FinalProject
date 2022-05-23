const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = mongoose.Schema(
  {
    CategoryName: { type: String, require: true },
  },
  { collection: "Category" }
);

CategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", CategorySchema);
