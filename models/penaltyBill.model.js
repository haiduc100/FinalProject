const mongoose = require("mongoose");

const PenaltyBillSechema = mongoose.Schema(
  {
    Percent: Number,
    PenaltyRuleId: { type: String, ref: "PenaltyRule" },
    UserId: { type: String, ref: "User" },
    StorageId: { type: String, ref: "Storage" },
    OldQuality: { type: Number, ref: "Quality" },
    NewQuality: { type: Number, ref: "Quality" },
  },
  { collection: "PenaltyBill", timestamps: true }
);

module.exports = mongoose.model("PenaltyBill", PenaltyBillSechema);
