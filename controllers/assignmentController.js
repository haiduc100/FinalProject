const Assginment = require("../models/assignment.model");
const Asset = require("../models/asset.model");
const User = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");
const requestBorrowModel = require("../models/requestBorrow.model");

module.exports.getAllAssignments = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      Assginment,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      ["AssignToId", "AssignById", "AssetId"]
    );
    const assets = await Asset.find({ State: "waiting" });
    const users = await User.find({});
    res.render("components/admin/assignmentManagementPage", {
      listAssignment: paginateData.data,
      listUser: users,
      listAsset: assets,
      staff: req.staff,
      currentRole: req.RoleName,
      role: req.Role.Role,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getAssignmentById = async (req, res) => {
  try {
    const assignments = await Assginment.findOne({ _id: req.params.id });
    if (assignments) {
      res.status(200).json({
        assignments,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "404 Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.createAssignment = async (req, res) => {
  try {
    await Asset.findByIdAndUpdate(
      { _id: req.body.AssetId },
      { State: "assigned" }
    );
    const staff = await User.findOne({ StaffCode: req.staff });

    req.body.AssignById = staff._id;
    if (req.body.SignedBy == req.body.AssignToId) {
      res.status(400).json({
        status: "Fail",
        message: "Can not assign for your self!!",
      });
    }
    if (req.body.AssignById == req.body.AssignToId) {
      res.status(400).json({
        status: "Fail",
        message: "Can not assign for your self!!",
      });
    }
    const assignment = await Assginment.create(req.body);
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assginment.findOne({ _id: req.params.id });
    const staff = await User.findOne({ StaffCode: req.staff });
    req.body.AssignById = staff._id;

    // req.body.AssignById = req.userId;
    if (req.body.AssignById == assignment.AssignToId) {
      res.status(400).json({
        status: "Fail",
        message: "Can not assign for your self!!",
      });
    } else {
      const newAssignment = await Assginment.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json({
        status: "success",
        data: { newAssignment },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assginment.findOne({ _id: req.params.id });
    if (!assignment) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find assignment",
      });
    }
    await Assginment.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Delete category successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
