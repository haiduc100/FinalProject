const qualityModel = require("../models/quality.model");
const userModel = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllQuality = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      qualityModel,
      {},
      { updatedAt: 1 },
      req.query.page,
      req.query.pageSize,
      ["EvaluatedBy", "AssetId"]
    );

    res.render("components/admin/QualityManagementPage", {
      listQualitys: paginateData.data,
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

module.exports.getQualityById = async (req, res) => {
  try {
    const Quality = await qualityModel.findOne({
      _id: req.params.id,
    });

    res.status(200).json({
      Quality,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createQuality = async (req, res) => {
  try {
    const staff = await userModel.findOne({ StaffCode: req.staff });
    req.body.EvaluatedBy = staff._id;
    const newQuality = await qualityModel.create(req.body);
    res.status(200).json({
      status: "Create Quality successfully",
      data: newQuality,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateQuality = async (req, res) => {
  try {
    const Quality = await qualityModel.findById(req.params.id);

    if (!Quality) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Quality",
      });
    }
    await Quality.updateOne({ _id: req.params.id }, req.body);
    const newQuality = await qualityModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      status: "success",
      data: newQuality,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteQuality = async (req, res) => {
  try {
    const Quality = await qualityModel.findById(req.params.id);

    if (!Quality) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find Quality",
      });
    }

    res.status(400).json({
      status: "Fail",
      message: "Quality must be unavailable",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
