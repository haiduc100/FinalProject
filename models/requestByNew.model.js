const mongoose = require("mongoose");

const RequestByNewSchema = mongoose.Schema(
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
    Amount: Number,
    AssetName: { type: String, require: true },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    ProcessStep: Number,
  },
  { collection: "RequestByNew" }
);

module.exports = mongoose.model("RequestByNew", RequestByNewSchema);
