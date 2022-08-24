const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    Handler: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: ["accepted", "denied", "waiting"],
      default: "waiting",
    },
    AssetId: { type: String, ref: "Asset" },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    ProcessStep: Number,
  },
  { collection: "Request" }
);

module.exports = mongoose.model("Request", RequestSchema);
