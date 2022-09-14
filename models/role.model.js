const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    RoleName: String,
    Level: Number,
  },
  { collection: "Role", timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
