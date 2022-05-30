const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        status: "Fail",
        message: "User not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.body.UserName });

    if (user) {
      return res
        .status(400)
        .json({ status: "Fail", message: "User already exists" });
    }
    req.body.Password = await bcrypt.hash(req.body.Password, 10);

    const newUser = new User({
      ...req.body,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY);

    res.status(200).json({
      status: "success",
      data: { newUser, token },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find user",
      });
    }

    const newUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find user",
      });
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete user successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

// module.exports.checkRole = async (req, res, next) => {

//   try {
//     const token = req.cookies.user;
//     if (token) {

//     }
    
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
// };


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
module.exports.LogInUser =  async (req, res) => {
  try {
      const data = await User.findOne({
       UserName: req.body.UserName  
      });
      if (data) {
          const checkPass = await bcrypt.compare(req.body.PassWord, data._doc.PassWord);
          if (checkPass) {
              const userID = data._id;
              const token = jwt.sign({id: userID}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 160});
              await User.updateOne({_id: data._id}, {token: token});
          
              res.cookie("user", token, {
                  expires: new Date(Date.now() + 6000000),
              });
              res.json({
                  message: "login successfully!",
                  status: 200,
                  err: false,
                  userid: userID,
              });
          } else {
              res.json({message: "Incorrect password!!!"});
          }
      } else {
          res.json({message: "login failed", status: 400, err: false});
      }
  } catch (error) {
      res.json({message: "Error server", status: 500, err: error});
  }
};

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
module.exports.LogInAdmin =  async (req, res) => {
  try {
      const data = await User.findOne({
       UserName: req.body.UserName  
      });
      if (data) {
          const checkPass = await bcrypt.compare(req.body.PassWord, data._doc.PassWord);
     
          if (checkPass) {
              const userID = data._id;
              const token = jwt.sign({id: userID}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 160});
              await User.updateOne({_id: data._id}, {token: token});
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
              res.json({message: "Incorrect password!!!"});
          }
      } else {
          res.json({message: "login failed", status: 400, err: false});
      }
  } catch (error) {
      res.json({message: "Error server", status: 500, err: error});
  }
};


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
      const password = await bcrypt.hash(req.body.password, 10);
      await UserModel.create({
          username: req.body.username,
          password: password,
          role: req.body.role
      });
      // console.log(91,data);
      res.json({
          message: "Create user successfully",
          status: 200,
          err: false,
      });
  } catch (error) {
      res.json({message: "Error server", status: 500, err: error});
  }
};

