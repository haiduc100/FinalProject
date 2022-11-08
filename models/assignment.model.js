const mongoose = require("../config/connectDB");

const AssignmentSchema = mongoose.Schema(
  {
    AssignToId: {
      type: String,
      ref: "User",
      require: true,
    },
    AssignById: {
      type: String,
      ref: "User",
    },
    SignedBy: {
      type: String,
      ref: "User",
    },
    AssetId: {
      type: String,
      ref: "Asset",
      require: true,
    },
    Note: { type: String, default: "" },
    // IsReturning: { type: Boolean, default: false },
    State: {
      type: String,
      enum: ["waitingToReturn", "returned", "reported", "borrowed"],
      default: "borrowed",
    },
    // TransferringId: {
    //   type: String,
    //   ref: "User",
    //   default: "None",
    // },
  },
  { collection: "Assignment", timestamps: true }
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
