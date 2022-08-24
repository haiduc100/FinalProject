const { Paginate } = require("../services/paginationServices");
const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
const userModel = require("../models/user.model");
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
    // res.status(500).json({
    //   status: "Fail",
    //   error,
    // });
  }
};
module.exports.getAllRequestByNew = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const staff = await userModel.findOne({ StaffCode: req.staff });
    const paginateData = await Paginate(
      RequestByNew,
      { RequestBy: staff._id },
      {},
      req.query.page,
      req.query.pageSize,
      []
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
    // res.status(500).json({
    //   status: "Fail",
    //   error,
    // });
  }
};
