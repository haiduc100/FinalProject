const mongoose = require("mongoose");

const RequestRepairSchema = mongoose.Schema(
  {
    AssetId: { type: String, ref: "Asset" },
    // Amount: { type: Number },
    SotockerId: { type: String, ref: "User" },
    DirectorId: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    State: {
      type: String,
      enum: ["waiting", "accpeted", "repairing"],
      default: "waiting",
    },
  },
  { collection: "RequestRepair", timestamps: true }
);

module.exports = mongoose.model("RequestRepair", RequestRepairSchema);
