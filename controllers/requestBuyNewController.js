const Category = require("../models/category.model");
const { Paginate } = require("../services/paginationServices");
const RequestBuyNewModel = require("../models/RequestBuyNew.model");
const userModel = require("../models/user.model");

module.exports.getAllRequestBuyNew = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    let currentStaff = await userModel.findOne({ StaffCode: req.staff });
    let paginateData;
    if (req.Role.Role == 3) {
      paginateData = await Paginate(
        RequestBuyNewModel,
        {
          State: {
            $nin: ["waiting"],
          },
        },
        { updatedAt: -1 },
        req.query.page,
        req.query.pageSize,
        ["Handler", "Category", "RequestBy", "DirectorId", "ManagerId"]
      );
    } else if (req.Role.Role == 0) {
      paginateData = await Paginate(
        RequestBuyNewModel,
        {
          Department: currentStaff.Department,
        },
        { updatedAt: -1 },
        req.query.page,
        req.query.pageSize,
        ["Handler", "Category", "RequestBy", "DirectorId", "ManagerId"]
      );
    } else {
      paginateData = await Paginate(
        RequestBuyNewModel,
        { State: { $in: ["signed", "bought"] } },
        { updatedAt: -1 },
        req.query.page,
        req.query.pageSize,
        ["Handler", "Category", "RequestBy", "DirectorId", "ManagerId"]
      );
    }
    const categorys = await Category.find({});
    const users = await userModel.find({});

    res.render("components/admin/RequestBuyNewPage", {
      listRequest: paginateData.data,
      listUser: users,
      listCategory: categorys,
      staff: req.staff,
      currentRole: req.RoleName,
      role: req.Role.Role,
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

module.exports.getRequestBuyNewById = async (req, res) => {
  try {
    const requests = await RequestBuyNewModel.findOne({ _id: req.params.id });

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
    // req.body.ProcessStep = RequestBuyNew;
    req.body.State = "waiting";
    const request = await RequestBuyNewModel.create(req.body);

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
    if (req.Role.Role == 0) {
      req.body.ManagerId = req.userId;
    }
    if (req.Role.Role == 3) {
      req.body.DirectorId = req.userId;
    }
    if (req.Role.Role == 2) {
      req.body.Handler = req.userId;
    }
    const request = await RequestBuyNewModel.findByIdAndUpdate(
      req.params.id,
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
