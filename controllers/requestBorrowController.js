const User = require("../models/user.model");
const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
const { Paginate } = require("../services/paginationServices");
const RequestBorrow = require("../models/requestBorrow.model");

module.exports.getAllRequestBorrow = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      RequestBorrow,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy", "AssetId"]
    );
    const categorys = await Category.find({});
    const users = await User.find({});
    res.render("components/admin/requestBorrowPage", {
      listRequest: paginateData.data,
      listUser: users,
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

module.exports.getRequestById = async (req, res) => {
  try {
    const requests = await RequestBorrow.findOne({
      _id: req.params.id,
    }).populate("RequestBy");
    // console.log(requests);

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestBorrow = async (req, res) => {
  try {
    const user = await User.findOne({ StaffCode: req.staff });
    await Asset.findByIdAndUpdate(
      { _id: req.body.AssetId },
      { State: "waiting" }
    );
    req.body.RequestBy = user._id;
    req.body.State = "waiting";
    const request = await RequestBorrow.create(req.body);

    res.status(200).json({
      status: "Create Request Borrow successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestBorrow = async (req, res) => {
  try {
    req.body.Handler = req.userId;
    const request = await RequestBorrow.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "Update Request Borrow successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
