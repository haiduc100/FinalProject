const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RequestRequestSchema = mongoose.Schema(
  {
    ReturnDate: { type: String, require: true },
    AccecptBy: {
      type: String,
      ref: "User",
      require: true,
    },
    State: { type: String, require: true },
    AssignmentId: {
      type: String,
      ref: "Assignment",
      require: true,
    },
    RequestBy: { type: String, ref: "User", require: true },
  },
  { collection: "RequestRequest" }
);

RequestRequestSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("RequestRequest", RequestRequestSchema);
