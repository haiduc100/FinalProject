const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const AssetSchema = mongoose.Schema(
  {
    AssetName: {
      type: String,
      require: true,
    },
    State: {
      type: String,
      default: "available",
      enum: ["unavilable", "available", "waiting", "recycled", "assigned"],
    },
    Category: {
      type: String,
      ref: "Category",
      require: true,
    },
    AssetDate: String,
    CreatedDate: { type: Date, default: new Date()},
  },
  { collection: "Asset" }
);

AssetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Asset", AssetSchema);
