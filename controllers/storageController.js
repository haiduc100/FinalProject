const qualityModel = require("../models/quality.model");
const storageModel = require("../models/storage.model");
const userModel = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllStorage = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      storageModel,
      {},
      { updatedAt: 1 },
      req.query.page,
      req.query.pageSize,
      [
        "StockerId",
        "AssignmentId",
        "RequestReturnId",
        "RequestBuyNewId",
        "QualityId",
      ]
    );

    res.render("components/admin/StorageManagementPage", {
      listStorages: paginateData.data,
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
module.exports.getQualityByAssignmentId = async (req, res) => {
  try {
    const storage = await storageModel
      .findOne({ $and: [{ AssignmentId: req.params.id }, { Type: "export" }] })
      .populate("QualityId");

    res.status(200).json({
      data: storage.QualityId.Quality,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports.getStorageById = async (req, res) => {
  try {
    const Storage = await storageModel.findOne({ _id: req.params.id });

    res.status(200).json({
      Storage,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createStorage = async (req, res) => {
  try {
    const staff = await userModel.findOne({ StaffCode: req.staff });
    req.body.StockerId = staff._id;

    let data = storageModel.create(req.body);

    res.status(200).json({
      status: "Create Storage successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateStorage = async (req, res) => {
  try {
    const Storage = await storageModel.findById(req.params.id);

    if (!Storage) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Storage",
      });
    }
    await Storage.updateOne({ _id: req.params.id }, req.body);
    const newStorage = await Storage.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: newStorage,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteStorage = async (req, res) => {
  try {
    const Storage = await storageModel.findById(req.params.id);

    if (!Storage) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find Storage",
      });
    }

    res.status(400).json({
      status: "Fail",
      message: "Storage must be unavailable",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
