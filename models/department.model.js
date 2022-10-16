const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema(
  {
    DepartmentName: { type: String },
    Prefix: { type: String },
  },
  { collection: "Department", timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
