const mongoose = require("../config/connectDB");

const RoleSchema = mongoose.Schema(
  {
    Role: Number,
    RoleName: String,
  },
  { collection: "Role", timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
