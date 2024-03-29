const Assginment = require("../models/assignment.model");
const { Paginate } = require("../services/paginationServices");
const assetModel = require("../models/asset.model");
const userModel = require("../models/user.model");
const assignmentModel = require("../models/assignment.model");

module.exports.getAllAssignments = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      Assginment,
      {},
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["AssignToId", "AssignById", "AssetId", "SignedBy"]
    );
    res.render("components/admin/assignmentManagementPage", {
      listAssignment: paginateData.data,
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
    const assignment = await Assginment.findOne({
      _id: req.params.id,
    }).populate("AssetId");
    if (assignment) {
      res.status(200).json({
        assignment,
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
module.exports.getAssignmentByAssetId = async (req, res) => {
  try {
    const assignment = await Assginment.findOne({
      $and: [
        { AssetId: req.params.id },
        {
          State: "reported",
        },
      ],
    });
    if (assignment) {
      res.status(200).json({
        assignment,
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
    await assetModel.findByIdAndUpdate(
      { _id: req.body.AssetId },
      { State: "assigned" }
    );
    const staff = await userModel.findOne({ StaffCode: req.staff });

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
    const newAssignment = await assignmentModel.create(req.body);
    res.status(200).json({ newAssignment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assginment.findOne({ _id: req.params.id });
    const staff = await userModel.findOne({ StaffCode: req.staff });
    req.body.AssignById = staff._id;

    // req.body.AssignById = req.userId;
    if (req.body.AssignById == assignment.AssignToId) {
      res.status(400).json({
        status: "Fail",
        message: "Can not assign for your self!!",
      });
    } else {
      const newAssignment = await Assginment.findByIdAndUpdate(
        req.params.id,
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
module.exports.updateAssignmentReturnState = async (req, res) => {
  try {
    await assignmentModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.updateAssignmentByRequestRepair = async (req, res) => {
  try {
    let assm = await assignmentModel
      .find({ AssetId: req.params.id })
      .sort({ updatedAt: -1 });

    await assignmentModel.findByIdAndUpdate(assm[0]._id, req.body);
    res.status(200).json({
      status: "success",
    });
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
    const assignment = await assignmentModel.findOne({ _id: req.params.id });
    if (!assignment) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find assignment",
      });
    }
    await assignmentModel.findByIdAndDelete(req.params.id);
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
