const mongoose = require("../config/connectDB");
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
      enum: [
        "unavailable",
        "available",
        "waiting",
        "waitingRepair",
        "repairing",
        "accepted",
        "assigned",
        "sold",
        "auction",
      ],
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
    QualityId: { type: String, ref: "Quality" },
  },
  { collection: "Asset", timestamps: true }
);

module.exports = mongoose.model("Asset", AssetSchema);
