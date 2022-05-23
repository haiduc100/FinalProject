const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RequestByNewSchema = mongoose.Schema(
  {
    AccecptBy: {
      type: String,
      ref: "User",
      require: true,
    },
    State: { type: String, require: true },
    AssetName: { type: String, require: true },
    RequestBy: { type: String, ref: "User", require: true },
  },
  { collection: "RequestByNew" }
);

RequestByNewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("RequestByNew", RequestByNewSchema);
