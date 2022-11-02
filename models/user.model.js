const mongoose = require("../config/connectDB");

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
    Department: {
      type: String,
      ref: "Department",
      require: true,
    },
    IsDelete: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "User", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
