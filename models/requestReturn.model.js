const mongoose = require("mongoose");

const RequestReturnSchema = mongoose.Schema(
  {
    Handler: {
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
  },
  { collection: "RequestReturn", timestamps: true }
);

module.exports = mongoose.model("RequestReturn", RequestReturnSchema);
