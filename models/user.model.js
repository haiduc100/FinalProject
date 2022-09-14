const mongoose = require("mongoose");

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
      type: String,
      ref: "Role",
    },
    UserName: String,
    StaffCode: String,
    Password: String,
    Email: String,
    Avatar: String,
    Department: {
      type: String,
      ref: "Department",
      require: true,
    },
  },
  { collection: "User", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
