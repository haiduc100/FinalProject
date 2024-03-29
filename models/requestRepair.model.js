const mongoose = require("../config/connectDB");

const RequestRepairSchema = mongoose.Schema(
  {
    AssetId: { type: String, ref: "Asset" },
    SotockerId: { type: String, ref: "User" },
    StaffId: { type: String, ref: "User" },
    DirectorId: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    State: {
      type: String,
      enum: ["waiting", "accpeted", "repairing", "denied", "fixed"],
      default: "waiting",
    },
  },
  { collection: "RequestRepair", timestamps: true }
);

module.exports = mongoose.model("RequestRepair", RequestRepairSchema);
