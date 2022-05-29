const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RequestByNewSchema = mongoose.Schema(
  {
    AccecptBy: {
      type: String,
      ref: "User",
    },
    State: {
      type: String,
      enum: ["accepted", "denied", "waiting"],
      default: "waiting",
    },
    AssetName: { type: String, require: true },
    RequestBy: { type: String, ref: "User" },
    Category: { type: String, ref: "Category" },
  },
  { collection: "RequestByNew" }
);

RequestByNewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("RequestByNew", RequestByNewSchema);
