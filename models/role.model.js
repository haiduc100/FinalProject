const mongoose = require("../config/connectDB");

const RoleSchema = mongoose.Schema(
  {
    Role: Number,
    RoleName: String,
    Amount: { type: Number, enum: [0, 500000, 500000000], default: 0 },
  },
  { collection: "Role", timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
