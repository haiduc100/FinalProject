const mongoose = require("mongoose");

const RequestBorrowSchema = mongoose.Schema(
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
    Description: String,
    ReturnDate: { type: Date },
    BorrowDate: { type: Date, default: new Date() },
  },
  { collection: "RequestBorrow" }
);

module.exports = mongoose.model("RequestBorrow", RequestBorrowSchema);
