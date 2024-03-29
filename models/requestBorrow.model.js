const mongoose = require("../config/connectDB");

const RequestBorrowSchema = mongoose.Schema(
  {
    Handler: {
      type: String,
      ref: "User",
    },
    Approval: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: [
        "submitToApproval",
        "denied",
        "waiting",
        "deniedByDirector",
        "signed",
        "assigned",
      ],
      default: "waiting",
    },
    Department: { type: String, ref: "Department" },
    AssetId: { type: String, ref: "Asset" },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
    Description: String,
    ReturnDate: { type: Date },
    BorrowDate: { type: Date, default: new Date() },
  },
  { collection: "RequestBorrow", timestamps: true }
);

module.exports = mongoose.model("RequestBorrow", RequestBorrowSchema);
