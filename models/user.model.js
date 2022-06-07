const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");
const UserSchema = mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    DateOfBirth: Date,
    Gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    Token: String,
    Role: {
      type: Number,
      enum: [0, 1],
      default: 1,
    }, //0 is admin, 1 is staff
    UserName: String,
    StaffCode: String,
    Password: String,
    Email: String,
    Avatar: String,
  },
  { collection: "User", timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
