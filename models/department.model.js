const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema(
  {
    DepartmentName: { type: String },
    Prefix: { type: String },
  },
  { collection: "Department" }
);

module.exports = mongoose.model("Department", DepartmentSchema);
