const Assginment = require("../models/assignment.model");
const Asset = require("../models/asset.model");
const User = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllAssignments = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    // const assignments = await Assginment.find()
    //   .populate("AssignToId")
    //   .populate("AssignById")
    //   .populate("AssetId");

    const paginateData = await Paginate(
      Assginment,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      ["AssignToId", "AssignById", "AssetId"]
    );
    const assets = await Asset.find({});
    const users = await User.find({});
    res.render("components/admin/assignmentManagementPage", {
      listAssignment: paginateData.data,
      listUser: users,
      listAsset: assets,
      staff: req.staff,
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
    const asset = await Asset.findOne({ _id: req.body.AssetId });
    if (asset.State == "available") {
      const assignment = await Assginment.create(req.body);
      res.status(200).json(assignment);
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Asset must be available",
      });
    }
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

    req.body.AssignById = req.userId;
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
    if (assignment.State === "accepted" || assignment.State === "denied") {
      await Assginment.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        message: "Delete category successfully",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Assignment State must be accepted or denied to be deleted",
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
