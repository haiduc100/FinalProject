const { Paginate } = require("../services/paginationServices");
const penaltyBillModel = require("../models/penaltyBill.model");

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
      ["StorageId", "UserId", "OldQuality", "NewQuality", "PenaltyRuleId"]
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
    const Penalty = await penaltyBillModel.findOne({ _id: req.params.id });

    res.status(200).json({
      Penalty,
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
    penaltyBillModel.create(req.body);
    res.status(200).json({
      status: "Create Penalty successfully",
      // data: newPenalty,
    });
  } catch (error) {
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
    await Penalty.updateOne({ _id: req.params.id }, req.body);
    const newPenalty = await penaltyBillModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
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
        message: "Can not find Penalty",
      });
    }

    res.status(400).json({
      status: "Fail",
      message: "Penalty must be unavailable",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
