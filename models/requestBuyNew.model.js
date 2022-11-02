const mongoose = require("../config/connectDB");

const RequestBuyNewSchema = mongoose.Schema(
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
      enum: ["submitToApproval", "denied", "waiting", "signed", "bought"],
      default: "waiting",
    },
    Amount: Number,
    AssetName: { type: String, require: true },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    ProcessStep: Number,
    Description: String,
  },
  { collection: "RequestBuyNew", timestamps: true }
);

module.exports = mongoose.model("RequestBuyNew", RequestBuyNewSchema);
