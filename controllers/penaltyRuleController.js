const penaltyRuleModel = require("../models/penaltyRule.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllpenaltyRule = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;

    const paginateData = await Paginate(
      penaltyRuleModel,
      {},
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      []
    );

    res.render("components/admin/penaltyRuleManagementPage", {
      listpenaltyRules: paginateData.data,
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

module.exports.getpenaltyRuleById = async (req, res) => {
  try {
    const penaltyRule = await penaltyRuleModel.findOne({ _id: req.params.id });

    res.status(200).json({
      penaltyRule,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createpenaltyRule = async (req, res) => {
  try {
    penaltyRuleModel.create(req.body);
    res.status(200).json({
      status: "Create penaltyRule successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updatepenaltyRule = async (req, res) => {
  try {
    const penaltyRule = await penaltyRuleModel.findById(req.params.id);

    if (!penaltyRule) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find penaltyRule",
      });
    }
    await penaltyRule.updateOne({ _id: req.params.id }, req.body);
    const newpenaltyRule = await penaltyRuleModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: newpenaltyRule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deletepenaltyRule = async (req, res) => {
  try {
    const penaltyRule = await penaltyRuleModel.findById(req.params.id);

    if (!penaltyRule) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find penaltyRule",
      });
    }

    res.status(400).json({
      status: "Fail",
      message: "penaltyRule must be unavailable",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
