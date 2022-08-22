const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const AssetSchema = mongoose.Schema(
  {
    AssetCode: { type: String },
    AssetName: {
      type: String,
      require: true,
    },
    State: {
      type: String,
      default: "available",
      enum: ["unavailable", "available", "waiting", "recycled", "assigned"],
    },
    Category: {
      type: String,
      ref: "Category",
      require: true,
    },
    AssetDate: Date,
    Amount: Number,
    PurchaseDate: { type: Date, default: new Date() },
    Description: String,
  },
  { collection: "Asset" }
);

AssetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Asset", AssetSchema);
