const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("components/admin/userManagementPage", {
      listUser: users,
    });
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
    console.log(error);
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

