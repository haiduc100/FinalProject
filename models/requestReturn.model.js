const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RequestReturnSchema = mongoose.Schema(
  {
    AccecptBy: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: ["completed", "declined","waiting"],
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
  { collection: "RequestReturn" }
);

RequestReturnSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("RequestReturn", RequestReturnSchema);
