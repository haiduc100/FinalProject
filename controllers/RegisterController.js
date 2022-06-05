

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





//views html register
module.exports.getAllAssignmentsRegister = async (req, res) => {
    try {
      res.render("components/LogIn/assetRegisterPage.ejs");
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        error,
      });
    }
  };
  
  //register
  module.exports.Register = async (req, res) => {
    try {
      const password = await bcrypt.hash(req.body.Password, 10);
      await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        DateOfBirth: req.body.DatOfBirth,
        Gender: req.body.Gender,
        Role: req.body.Role,
        UserName: req.body.UserName,
        StaffCode: req.body.StaffCode,
        Password: password,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        Avatar: req.body.Avatar
      });
      res.json({
        message: "Create user successfully",
        status: 200,
        err: false,
      });
    
      // alert('Register user successfully')
     // res.render("pages/home");
    } catch (error) {
      console.log(error);
      res.json({ message: "Error server", status: 500, err: error });
    }
  };
  












