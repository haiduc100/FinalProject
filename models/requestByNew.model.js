const mongoose = require("mongoose");

const RequestByNewSchema = mongoose.Schema(
  {
    SuggestionLink: String,
    Price: Number,
    Reason: String,
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
    Description: String,
  },
  { collection: "RequestByNew", timestamps: true }
);

module.exports = mongoose.model("RequestByNew", RequestByNewSchema);
