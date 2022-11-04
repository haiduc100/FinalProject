const { Paginate } = require("../services/paginationServices");
const penaltyBillModel = require("../models/penaltyBill.model");
const penaltyRuleModel = require("../models/penaltyRule.model");

module.exports.getAllPenalty = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      penaltyBillModel,
      {},
      { updatedAt: 1 },
      req.query.page,
      req.query.pageSize,
      ["StorageId", "UserId", "PenaltyRuleId"]
    );

    res.render("components/admin/PenaltyManagementPage", {
      listPenaltys: paginateData.data,
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

// module.exports.filterPenalty = async (req, res) => {
//   try {
//     const Penaltys = await Penalty.find({
//       PenaltyName: { $regex: req.query.search, $options: "i" },
//     }).populate("Category");
//     const category = await Category.find({});

//     res.status(200).render("components/admin/PenaltyFilterPage", {
//       listPenaltys: Penaltys,
//       listCategory: category,
//       staff: req.staff,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
// };

module.exports.getPenaltyById = async (req, res) => {
  try {
    const Penalty = await penaltyBillModel
      .findOne({ _id: req.params.id })
      .populate("StorageId")
      .populate("UserId");

    res.status(200).json({
      data: Penalty,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createPenalty = async (req, res) => {
  try {
    let arr = await penaltyRuleModel.find({});
    arr.sort((a, b) => {
      return a.Percent - b.Percent;
    });
    let temp;
    for (const key of arr) {
      if (key.Percent < req.body.Percent) {
        continue;
      } else {
        temp = key.Amount;
        break;
      }
    }
    let rule = await penaltyRuleModel.findOne({ Amount: temp });
    req.body.Amount = rule.Amount;
    req.body.PenaltyRuleId = rule._id;
    let newPenalty = await penaltyBillModel.create(req.body);
    res.status(200).json({
      status: "create Penalty successfully",
      data: newPenalty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updatePenalty = async (req, res) => {
  try {
    const Penalty = await penaltyBillModel.findById(req.params.id);

    if (!Penalty) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Penalty",
      });
    }
    const newPenalty = await penaltyBillModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "Update penalty bill successfully!",
      data: newPenalty,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deletePenalty = async (req, res) => {
  try {
    const Penalty = await penaltyBillModel.findById(req.params.id);

    if (!Penalty) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find Penalty bill",
      });
    }
    await penaltyBillModel.findByIdAndDelete(req.params.id);
    res.status(400).json({
      status: "success",
      message: "delete penalty bill successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
