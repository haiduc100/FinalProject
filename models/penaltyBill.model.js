const mongoose = require("../config/connectDB");

const PenaltyBillSechema = mongoose.Schema(
  {
    Percent: Number,
    Amount: Number,
    PenaltyRuleId: { type: String, ref: "PenaltyRule" },
    UserId: { type: String, ref: "User" },
    StorageId: { type: String, ref: "Storage" },
    OldQuality: { type: Number },
    NewQuality: { type: Number },
    IsFines: { type: Boolean, default: false },
  },
  { collection: "PenaltyBill", timestamps: true }
);

module.exports = mongoose.model("PenaltyBill", PenaltyBillSechema);
