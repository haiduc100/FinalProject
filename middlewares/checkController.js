const User = require("../models/user.model");
const jwt = require("jsonwebtoken");



module.exports.checkDuplicate = (req, res, next) => {
  console.log(200,req.body);
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


  // module.exports.checkRole =  (req, res, next) => {
  //   try {
  //     const role =  req.role
  //     if (role == 0) {
  //       next()
  //     } else {
  //       res.json("You must have permission admin to view this page")
  //     }
  //   } catch (e) {
  //     res.json(e)
  //   }
  // }



  module.exports.checkLogin = (req, res, next) => {
    const cookies = req.cookies.user;
    try {
      if (cookies) {
        const userid = jwt.verify(cookies,  process.env.ACCESS_TOKEN_SECRET).id;
        User.findOne({ _id: userid, token: cookies })
          .then((data) => {
            if (data) {
              req.Role = data.role;
              next();
            } else {
              res.redirect("asset");
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.redirect("/user/LogIn");
      }
    } catch (error) {
      console.log(62, error);
    }
  };












