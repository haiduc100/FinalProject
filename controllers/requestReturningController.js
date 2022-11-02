const RequestReturning = require("../models/requestReturn.model");
const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const Asset = require("../models/asset.model");
const { Paginate } = require("../services/paginationServices");
const assignmentModel = require("../models/assignment.model");
const userModel = require("../models/user.model");

module.exports.getAllRequestReturn = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      RequestReturning,
      {},
      { updateAt: -1 },
      req.query.page,
      req.query.pageSize,
      [
        "RequestBy",
        "Handler",
        { path: "AssignmentId", populate: { path: "AssetId" } },
      ]
    );
    const users = await User.find({});
    // res.status(200).json(requestReturning);
    res.render("components/admin/requestReturnPage", {
      listRequestReturning: paginateData.data,
      listUsers: users,
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

module.exports.getRequestReturnById = async (req, res) => {
  try {
    const request = await RequestReturning.findOne({
      _id: req.params.id,
    })
      .populate("RequestBy")
      .populate("AssignmentId");

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
    const staff = await userModel.findOne({ StaffCode: req.staff });
    req.body.RequestBy = staff._id;
    const newRequestReturning = await RequestReturning.create(req.body);

    res.status(200).json({
      status: "Create Request Returning successfully",
      data: newRequestReturning,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestReturning = async (req, res) => {
  try {
    req.body.Handler = req.userId;
    const updateRequestReturning = await RequestReturning.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const request = await RequestReturning.findOne({
      _id: req.params.id,
    });
    if (req.body.State === "declined") {
      await assignmentModel.findByIdAndUpdate(request.AssignmentId, {
        IsReturning: false,
      });
    } else {
      // await Assignment.findByIdAndRemove({ _id: request.AssignmentId });
      await assignmentModel.findByIdAndUpdate(request.AssignmentId, {
        IsReturning: true,
      });
      const temp = await assignmentModel.findById(request.AssignmentId);
      await Asset.findByIdAndUpdate(
        { _id: temp.AssetId },
        { State: "available" }
      );
      res.status(200).json({
        status: "success",
        data: updateRequestReturning,
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
