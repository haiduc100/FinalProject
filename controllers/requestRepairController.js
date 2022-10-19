const requestRepairModel = require("../models/requestRepair.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllRequestRepair = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      requestRepairModel,
      {},
      { updatedAt: 1 },
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
      RequestRepair,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestRepair = async (req, res) => {
  try {
    requestRepairModel.create(req.body);
    res.status(200).json({
      status: "Create RequestRepair successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateRequestRepair = async (req, res) => {
  try {
    const RequestRepair = await requestRepairModel.findById(req.params.id);

    if (!RequestRepair) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find RequestRepair",
      });
    }
    await RequestRepair.updateOne({ _id: req.params.id }, req.body);
    const newRequestRepair = await requestRepairModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      status: "success",
      data: newRequestRepair,
    });
  } catch (error) {
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
