const { Paginate } = require("../services/paginationServices");
const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
module.exports.getAllAssetAvailable = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      Asset,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      []
    );

    res.render("components/staff/staffHomePage", {
      listAssets: paginateData.data,
      staff: req.staff,
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
