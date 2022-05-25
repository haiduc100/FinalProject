const Assginment = require("../models/assignment.model");
const Asset = require("../models/asset.model");
module.exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assginment.find()
      .populate("AssignToId")
      .populate("AssignById")
      .populate("AssetId");
      
    res.render("components/admin/assignmentManagementPage", {
      listAssignment: assignments,
    });
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
    if (!assignment) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find assignment",
      });
    }
    const newAssignment = await Assginment.updateOne(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "success",
      data: { newAssignment },
    });
  } catch (error) {
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
      return res.status(400).json({
        status: "Fail",
        message: "Can not find assignment",
      });
    }
    await Assginment.deleteAssignment({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Delete category successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
