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
    AssetId: {
      type: String,
      ref: "Asset",
      require: true,
    },
    State: {
      type: String,
      require: true,
      enum: ["accepted", "denied", "waiting"],
      default: "waiting",
    },
    Amount: Number,
    Note: { type: String, default: "Nothing yet" },
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
