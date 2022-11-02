const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

module.exports.checkDuplicate = async (req, res, next) => {
  await userModel
    .findOne({ Username: req.body.UserName })
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

module.exports.checkRole = async (req, res, next) => {
  try {
    const role = await roleModel.findById(req.Role);

    if (role.Role !== 1) {
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
      const data = await userModel.findOne({ _id: userid }).populate("Role");

      if (data) {
        req.Role = data.Role;
        req.RoleName = data.Role.RoleName;
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
