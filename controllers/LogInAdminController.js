const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//View html Login
module.exports.getAllAssignmentsLogInAdmin = async (req, res) => {
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
    const data = await User.findOne({
      UserName: req.body.UserName,
    });
    if (data) {
      const checkPass = await bcrypt.compare(
        req.body.PassWord,
        data._doc.Password
      );
      if (checkPass) {
        if (data.Role === 0) {
          const userID = data._id;
          const token = jwt.sign(
            { id: userID },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 16000 }
          );
          await User.updateOne({ _id: data._id }, { Token: token });
          res.cookie("admin", token, {
            expires: new Date(Date.now() + 6000000),
          });
          res.json({
            message: "login successfully!",
            status: 200,
            err: false,
            userid: userID,
          });
        } else {
          res.status(400).json({
            message:
              "You must have the administrator role to access this page!!!",
          });
        }
      } else {
        res.json({ message: "Incorrect password!!!" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (error) {
    res.json({ message: "Error server", status: 500, err: error });
  }
};

module.exports.LogOutAdmin = async (req, res) => {
  try {
    res.cookie.remove("admin");
  } catch (error) {
    res.json({ message: "Error server", status: 500, err: error });
  }
};
