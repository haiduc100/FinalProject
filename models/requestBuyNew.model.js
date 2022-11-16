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
      enum: [
        "submitToApproval",
        "denied",
        "deniedByDirector",
        "waiting",
        "signed",
        "bought",
      ],
      default: "waiting",
    },
    DirectorId: { type: String, ref: "User" },
    ManagerId: { type: String, ref: "User" },
    Amount: Number,
    AssetName: { type: String, require: true },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    Description: String,
  },
  { collection: "RequestBuyNew", timestamps: true }
);

module.exports = mongoose.model("RequestBuyNew", RequestBuyNewSchema);
