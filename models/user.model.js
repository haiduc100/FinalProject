const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    DateOfBirth: String,
    Gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    Role: Number,
    UserName: String,
    StaffCode: String,
    Password: String,
  },
  { collection: "User", timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

 module.exports = mongoose.model("User", UserSchema);

