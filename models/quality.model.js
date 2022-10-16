const mongoose = require("mongoose");

const QualitySchema = mongoose.Schema(
  {
    EvaluatedBy: {
      type: String,
      ref: "User",
    },
    AssetId: {
      type: String,
      ref: "Asset",
    },
    Quality: {
      type: Number,
    },
  },
  { collection: "Quality", timestamps: true }
);

module.exports = mongoose.model("Quality", QualitySchema);
