const RequestReturning = require("../models/requestReturn.model");
const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
module.exports.getAllRequestReturn = async (req, res) => {
  try {
    const requestReturning = await RequestReturning.find()
      .populate("RequestBy")
      .populate("AccecptBy");
    const users = await User.find({});
    // res.status(200).json(requestReturning);
    res.render("components/admin/requestReturnPage", {
      listRequestReturning: requestReturning,
      listUsers: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getRequestReturnById = async (req, res) => {
  try {
    const request = await RequestReturning.findOne({
      _id: req.params.id,
    });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestReturning = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.body.AssignmentId,
    });
    if (assignment.State === "accepted") {
      const newRequestReturning = await RequestReturning.create(req.body);
      await Assignment.updateOne(
        {
          _id: req.body.AssignmentId,
        },
        { IsReturning: true }
      );
      // assignment.IsReturning = true;
      res.status(200).json({
        status: "Create Request Returning successfully",
        data: newRequestReturning,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Assignment state must be accepted before returning",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestReturning = async (req, res) => {
  try {
    const updateRequestReturning = await RequestReturning.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    if (req.body.State === "declined") {
      const request = await RequestReturning.findOne({
        _id: req.params.id,
      });
      await Assignment.findByIdAndUpdate(
        { _id: request.AssignmentId },
        { IsReturning: false }
      );
    }
    res.status(200).json({
      status: "success",
      data: updateRequestReturning,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
