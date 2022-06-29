const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//View html Login
module.exports.getAllAssignmentsLogInUser = async (req, res) => {
  try {
    res.render("components/LogIn/assetLogInPage.ejs");
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//LogIn user
module.exports.LogInUser = async (req, res) => {
  try {
    const data = await User.findOne({
      UserName: req.body.UserName,
    });
    if (data) {
      console.log(data);
      const checkPass = await bcrypt.compare(
        req.body.PassWord,
        data._doc.Password
      );
      console.log(29, checkPass);
      if (checkPass) {
        const userID = data._id;
        const token = jwt.sign(
          { id: userID },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 16000 }
        );
        await User.updateOne({ _id: data._id }, { Token: token });
        res.cookie("user", token, {
          expires: new Date(Date.now() + 6000000),
        });
        //ve trag home
        // res.render("pages/home", { listAsset: userID });
        res.json({ status: 200, message: "success" });
      } else {
        res.json({ message: "Incorrect password!!!" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });

      // res.render("components/LogIn/assetLogInPage");
    }
  } catch (error) {
    console.log(55, error);

    res.json({ message: "Error server", status: 500, err: error });
  }
};

module.exports.LogOutUser = async (req, res) => {
  try {
    res.cookie.remove("user");
  } catch (error) {
    res.json({ message: "Error server", status: 500, err: error });
  }
};
