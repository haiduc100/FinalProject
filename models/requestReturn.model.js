const mongoose = require("mongoose");

const RequestReturnSchema = mongoose.Schema(
  {
    AccecptBy: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: ["completed", "declined", "waiting"],
      default: "waiting",
    },
    AssignmentId: {
      type: String,
      ref: "Assignment",
      require: true,
    },
    RequestBy: {
      type: String,
      ref: "User",
      require: true,
    },
    ProcessStep: Number,
  },
  { collection: "RequestReturn" }
);

module.exports = mongoose.model("RequestReturn", RequestReturnSchema);
