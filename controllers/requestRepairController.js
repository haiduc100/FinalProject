const requestRepairModel = require("../models/requestRepair.model");
const userModel = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllRequestRepair = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      requestRepairModel,
      {},
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["AssetId", "SotockerId", "DirectorId", "Category"]
    );

    res.render("components/admin/RequestRepairManagementPage", {
      listRequestRepairs: paginateData.data,
      totalPages: paginateData.totalPages,
      staff: req.staff,
      currentRole: req.RoleName,
      role: req.Role.Role,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getRequestRepairById = async (req, res) => {
  try {
    const RequestRepair = await requestRepairModel.findOne({
      _id: req.params.id,
    });

    res.status(200).json({
      data: RequestRepair,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestRepairByStocker = async (req, res) => {
  try {
    const user = await userModel.findOne({ StaffCode: req.staff });
    req.body.SotockerId = user._id;
    let request = await requestRepairModel.create(req.body);
    res.status(200).json({
      status: "Create RequestRepair successfully",
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
module.exports.createRequestRepairByStaff = async (req, res) => {
  try {
    const user = await userModel.findOne({ StaffCode: req.staff });
    req.body.StaffId = user._id;
    let request = await requestRepairModel.create(req.body);
    res.status(200).json({
      status: "Create RequestRepair successfully",
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateRequestRepair = async (req, res) => {
  try {
    const RequestRepair = await requestRepairModel.findById(req.params.id);
    req.body.DirectorId = req.userId;
    if (!RequestRepair) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find RequestRepair",
      });
    }

    const newRequestRepair = await requestRepairModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(200).json({
      status: "success",
      data: newRequestRepair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteRequestRepair = async (req, res) => {
  try {
    const RequestRepair = await requestRepairModel.findById(req.params.id);

    if (!RequestRepair) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find RequestRepair",
      });
    }
    await requestRepairModel.findByIdAndDelete(req.params.id);
    res.status(400).json({
      status: "Fail",
      message: "RequestRepair must be unavailable",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
