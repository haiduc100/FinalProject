const { Paginate } = require("../services/paginationServices");
const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
const User = require("../models/user.model");
const RequestBorrow = require("../models/requestBorrow.model");
const Assignment = require("../models/assignment.model");
const RequestReturn = require("../models/requestReturn.model");
const requestBuyNewModel = require("../models/requestBuyNew.model");
module.exports.getAllAssetAvailable = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      Asset,
      { State: "available" },
      {},
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.getAllAssignment = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const staff = await User.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      Assignment,
      { AssignToId: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      ["AssignToId", "AssignById", "AssetId"]
    );
    const assets = await Asset.find({ State: "available" });
    const users = await User.find({});
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
    const staff = await User.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      RequestBorrow,
      { RequestBy: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy", "AssetId"]
    );
    const categorys = await Category.find({});
    const users = await User.find({});

    res.render("components/staff/requestBorrowPage", {
      listRequest: paginateData.data,
      User: users,
      listCategory: categorys,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
module.exports.getAllRequestReturn = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await User.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      RequestReturn,
      { RequestBy: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      ["RequestBy", "Handler", "AssignmentId"]
    );
    const categorys = await Category.find({});
    const users = await User.find({});

    res.render("components/staff/requestReturnPage", {
      listRequestReturning: paginateData.data,
      User: users,
      listCategory: categorys,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
module.exports.getAllRequestBuyNew = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await User.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      requestBuyNewModel,
      { RequestBy: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy"]
    );
    const listCategory = await Category.find({});
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
module.exports.getAllAccountInformation = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await User.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      User,
      { RequestBy: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy"]
    );
    const listCategory = await Category.find({});
    res.render("components/staff/staffRequestByNewPage", {
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
