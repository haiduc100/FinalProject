const mongoose = require("../config/connectDB");

const RequestReturnSchema = mongoose.Schema(
  {
    Handler: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: ["completed", "denied", "waiting"],
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
