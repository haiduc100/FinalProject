const { Paginate } = require("../services/paginationServices");
const Category = require("../models/category.model");
const RequestBuyNewModel = require("../models/RequestBuyNew.model");
const userModel = require("../models/user.model");
const assetModel = require("../models/asset.model");
const assignmentModel = require("../models/assignment.model");
const requestBorrowModel = require("../models/requestBorrow.model");
const categoryModel = require("../models/category.model");
const penaltyBillModel = require("../models/penaltyBill.model");
const requestReturnModel = require("../models/requestReturn.model");
const requestRepairModel = require("../models/requestRepair.model");
module.exports.getAllAssetAvailable = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      assetModel,
      { State: "available" },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Category"]
    );
    const listCategory = await Category.find({});
    res.render("components/staff/staffHomePage", {
      listAssets: paginateData.data,
      staff: req.staff,
      listCategory: listCategory,
      totalPages: paginateData.totalPages,
      role: req.Role.Role,
      currentRole: req.RoleName,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   status: "Fail",
    //   error,
    // });
  }
};
module.exports.getAllAssignment = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      assignmentModel,
      { AssignToId: staff._id },
      { updateAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["AssignToId", "AssignById", "AssetId"]
    );
    const assets = await assetModel.find({ State: "available" });
    const users = await userModel.find({});
    res.render("components/staff/staffAssignmentPage", {
      listAssignment: paginateData.data,
      listUser: users,
      listAsset: assets,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getAllRequestBorrow = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      requestBorrowModel,
      { RequestBy: staff._id },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy", "AssetId"]
    );
    const categorys = await Category.find({});
    const users = await userModel.find({});

    res.render("components/staff/requestBorrowPage", {
      listRequest: paginateData.data,
      User: users,
      listCategory: categorys,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
    console.log(error);
  }
};
module.exports.getAllRequestReturn = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      requestReturnModel,
      { RequestBy: staff._id },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      [
        "RequestBy",
        "Handler",
        { path: "AssignmentId", populate: { path: "AssetId" } },
      ]
    );
    const categorys = await categoryModel.find({});
    const users = await userModel.find({});

    res.render("components/staff/requestReturnPage", {
      listRequestReturning: paginateData.data,
      User: users,
      listCategory: categorys,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
    console.log(error);
  }
};
module.exports.getAllRequestRepair = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      requestRepairModel,
      { StaffId: staff._id },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["AssetId", "SotockerId", "DirectorId", "Category", "State", "StaffId"]
    );
    const categorys = await categoryModel.find({});
    const users = await userModel.find({});

    res.render("components/staff/requestRepairPage", {
      listRequestRepairs: paginateData.data,
      User: users,
      listCategory: categorys,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
    console.log(error);
  }
};
module.exports.getAllRequestBuyNew = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      RequestBuyNewModel,
      { RequestBy: staff._id },
      { updateAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy"]
    );
    const listCategory = await categoryModel.find({});
    res.render("components/staff/staffRequestBuyNewPage", {
      listRequest: paginateData.data,
      staff: req.staff,
      listCategory: listCategory,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.getAccountInformation = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      userModel,
      { _id: req.userId },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Department"]
    );
    res.render("components/staff/accountManagementPage", {
      data: paginateData.data,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.getListPenalty = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      penaltyBillModel,
      { UserId: req.userId },
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["StorageId", "UserId"]
    );
    res.render("components/staff/penaltyPage", {
      listPenaltys: paginateData.data,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
