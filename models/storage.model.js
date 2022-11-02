const mongoose = require("../config/connectDB");

const StorageSchema = mongoose.Schema(
  {
    AssignmentId: {
      type: String,
      ref: "Assignment",
    },
    RequestReturnId: {
      type: String,
      ref: "RequestReturn",
    },
    RequestBuyNewId: {
      type: String,
      ref: "RequestBuyNew",
    },
    RequestRepairId: {
      type: String,
      ref: "RequestRepair",
    },
    Type: {
      type: String,
      enum: ["export", "import"],
    },
    StockerId: {
      type: String,
      ref: "User",
    },
    QualityId: {
      type: String,
      ref: "Quality",
    },
  },
  { collection: "Storage", timestamps: true }
);

module.exports = mongoose.model("Storage", StorageSchema);
