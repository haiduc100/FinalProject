const mongoose = require("../config/connectDB");

const PenaltyRuleSechema = mongoose.Schema(
  {
    Percent: Number,
    Amount: Number,
  },
  { collection: "PenaltyRule", timestamps: true }
);

module.exports = mongoose.model("PenaltyRule", PenaltyRuleSechema);
