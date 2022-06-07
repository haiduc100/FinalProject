const RequestByNew = require("../models/requestByNew.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");
module.exports.getAllRequestByNew = async (req, res) => {
  try {
    const requests = await RequestByNew.find({})
      .populate("AccecptBy")
      .populate("Category")
      .populate("RequestBy");

    const categorys = await Category.find({});
    const users = await User.find({});
    res.render("components/admin/requestByNewPage", {
      listRequest: requests,
      listUser: users,
      listCategory: categorys,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getRequestById = async (req, res) => {
  try {
    const requests = await RequestByNew.findOne({ _id: req.params.id });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestByNew = async (req, res) => {
  try {
    req.body.State = "waiting";
    const request = await RequestByNew.create(req.body);

    res.status(200).json({
      status: "Create Request By New successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestByNew = async (req, res) => {
  try {
    req.body.AccecptBy = req.userId;
    const request = await RequestByNew.findByIdAndUpdate(
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
