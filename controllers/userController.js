const User = require("../models/user.model");
const Department = require("../models/department.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Paginate } = require("../services/paginationServices");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      User,
      { IsDelete: false },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Department", "Role"]
    );
    const department = await Department.find({});
    const roles = await roleModel.find({});
    res.render("components/admin/userManagementPage", {
      listUser: paginateData.data,
      listDepartment: department,
      staff: req.staff,
      totalPages: paginateData.totalPages,
      listRole: roles,
      currentRole: req.RoleName,
      role: req.Role.Role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ _id: req.params.id })
      .populate("Department");
    if (user) {
      res.status(200).json(user);
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
module.exports.logOut = async function (req, res) {
  try {
    await userModel.findByIdAndUpdate(req.userId, {
      token: "",
    });
    res.status(200).json({ message: "logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.createUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      UserName: req.body.UserName,
      IsDelete: false,
    });

    if (user) {
      return res
        .status(400)
        .json({ status: "Fail", message: "User name already exists" });
    }
    if (new Date(req.body.DateOfBirth).getTime() > new Date().getTime()) {
      return res.status(400).json({
        status: "Fail",
        message: "Date Of Birth must be greater than today",
      });
    }
    const department = await Department.findOne({ _id: req.body.Department });

    req.body.StaffCode =
      department.Prefix + Math.random().toString(36).substring(7);

    let firstName = req.body.FirstName.toLocaleLowerCase().split(" ");
    for (let i = 0; i < firstName.length; i++) {
      firstName[i] = firstName[i][0];
    }
    req.body.Password =
      req.body.LastName.toLocaleLowerCase().trim() +
      firstName.join("").trim() +
      req.body.DateOfBirth.split("-").reverse().join("");
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    let newUser = await userModel.create(req.body);
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

    const newUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Update user information successfully",
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

    // await User.deleteOne({ _id: req.params.id });
    await User.findByIdAndUpdate(req.params.id, { IsDelete: true });
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
// min 8 letter password, with at least a symbol, upper and lower case letters and a number
regex = (str) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};
module.exports.changePassword = async (req, res) => {
  try {
    let user = await userModel.findOne({
      _id: req.params.id,
    });
    let oldPassword = user.Password;
    let inputPassword = req.body.Password;
    let newPassword = req.body.newPassword;
    let checkPassword = await bcrypt.compare(inputPassword, oldPassword);
    let newPasswordBase;
    if (checkPassword == true) {
      if (regex(newPassword)) {
        newPasswordBase = bcrypt.hashSync(newPassword, 10);
        await userModel.findByIdAndUpdate(user._id, {
          Password: newPasswordBase,
          token: "",
        });
        return res
          .status(200)
          .json({ message: "change password success", status: 200 });
      } else {
        return res.status(400).json({
          message:
            " min 8-letter password, with at least a symbol, upper and lower case letters, and a number",
          status: 400,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect password!", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      error: error,
    });
  }
};
