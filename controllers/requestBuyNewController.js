const Category = require("../models/category.model");
const { Paginate } = require("../services/paginationServices");
const requestBuyNewModel = require("../models/requestBuyNew.model");
const userModel = require("../models/user.model");

module.exports.getAllRequestBuyNew = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      requestBuyNewModel,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      ["Handler", "Category", "RequestBy"]
    );
    const categorys = await Category.find({});
    const users = await userModel.find({});

    res.render("components/admin/requestBuyNewPage", {
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
  }
};

module.exports.getRequestById = async (req, res) => {
  try {
    const requests = await requestBuyNewModel.findOne({ _id: req.params.id });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestBuyNew = async (req, res) => {
  try {
    const user = await userModel.findOne({ StaffCode: req.staff });
    req.body.RequestBy = user._id;
    req.body.ProcessStep = 1;
    req.body.State = "waiting";
    const request = await requestBuyNewModel.create(req.body);

    res.status(200).json({
      status: "Create Request By New successfully",
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestBuyNew = async (req, res) => {
  try {
    req.body.Handler = req.userId;
    const request = await requestBuyNewModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "Update Request By New successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
