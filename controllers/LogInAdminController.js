const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

//View html Login
module.exports.getLoginPage = async (req, res) => {
  try {
    res.render("components/LogIn/assetLogInAdminPage.ejs");
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//LogIn admin
module.exports.LogInAdmin = async (req, res) => {
  try {
    const data = await userModel.findOne({
      UserName: req.body.UserName,
    });
    const role = await roleModel.findById(data.Role);
    if (data) {
      const checkPass = await bcrypt.compare(
        req.body.PassWord,
        data._doc.Password
      );
      if (checkPass) {
        if (role.Role !== 1) {
          const userID = data._id;
          const token = jwt.sign(
            { id: userID },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 900000 }
          );
          await User.updateOne({ _id: data._id }, { Token: token });
          res.cookie("user", token, {
            expires: new Date(Date.now() + 900000),
          });
          res.json({
            message: "login successfully!",
            status: 200,
            err: false,
            userid: userID,
            currentRole: role.Role,
          });
        } else {
          res.status(400).json({
            message:
              "You must have the administrator role to access this page!!!",
          });
        }
      } else {
        res.status(400).json({ message: "Incorrect password!!!" });
      }
    } else {
      console.log(error);

      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Error server", status: 500, err: error });
  }
};
