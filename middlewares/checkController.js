const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.checkDuplicate = (req, res, next) => {
  User.findOne({ Username: req.body.UserName })
    .then((user) => {
      if (user) {
        res.json({
          message: "User already exists!",
          status: 400,
          err: false,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.json({ message: "Error server", status: 500, err: err });
    });
};

module.exports.checkRole = (req, res, next) => {
  try {
    const role = req.Role;
    if (role == 0) {
      next();
    } else {
      res.redirect("/user/LogInAdmin");
    }
  } catch (e) {
    res.json(e);
  }
};

module.exports.checkLogin = async (req, res, next) => {
  const cookies = await req.cookies.user;
  try {
    if (cookies) {
      const userid = await jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET)
        .id;
      const data = await User.findOne({ _id: userid });

      if (data) {
        req.Role = data.Role;
        req.userId = userid;
        req.staff = data.StaffCode;
        next();
      } else {
        res.redirect("/user/LogIn");
      }
    } else {
      res.redirect("/user/LogIn");
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      res.redirect("/user/LogIn");
    } else {
      console.log(error);
    }
  }
};
