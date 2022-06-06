
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
    console.log(22, req.body);
    const data = await User.findOne({
      UserName: req.body.UserName,
    });
    console.log(26, data);
    if (data) {
      const checkPass = await bcrypt.compare(
        req.body.PassWord,
        data._doc.Password
      );
      console.log(32, checkPass);
      if (checkPass) {
        const userID = data._id;
        const token = jwt.sign(
          { id: userID },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 160 }
        );
        await User.updateOne({ _id: data._id }, { token: token });
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
