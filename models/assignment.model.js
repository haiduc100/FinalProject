const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    IsReturning: { type: Boolean, default: false },
    TransferringId: {
      type: String,
      ref: "User",
      default: "None",
    },
  },
  { collection: "Assignment", timestamps: true }
);

AssignmentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Assignment", AssignmentSchema);
