const mongoose = require("mongoose");

const StorageSchema = mongoose.Schema(
  {
    AssignmentId: {
      type: String,
      ref: "Assignment",
    },
    RequestReturnId: {
      type: String,
      ref: "RequestReturn",
    },
    RequestByNewId: {
      type: String,
      ref: "RequestByNew",
    },
    Type: {
      type: String,
      enum: ["export", "import"],
    },
    StockerId: {
      type: String,
      ref: "User",
    },
  },
  { collection: "Storage", timestamps: true }
);

module.exports = mongoose.model("Storage", StorageSchema);
