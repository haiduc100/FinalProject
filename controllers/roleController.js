const { Paginate } = require("../services/paginationServices");
const Role = require("../models/role.model");
module.exports.getAllRole = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      Role,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      []
    );

    res.render("components/admin/roleManagementPage", {
      listRole: paginateData.data,
      staff: req.staff,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
module.exports.createRole = async (req, res) => {
  try {
    const role = await Role.findOne({
      RoleName: req.body.RoleName,
    });

    if (role) {
      return res
        .status(400)
        .json({ status: "Fail", message: "This role already exists!!!" });
    }
    const newRole = await Role.create(req.body);

    res.status(200).json({
      status: "success",
      data: { newRole },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id });

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id });
    if (!role) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Role",
      });
    }
    const newRole = await Role.updateOne({ _id: req.params.id }, req.body);

    res.status(200).json({
      status: "success",
      data: { newRole },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Role",
      });
    }

    await Role.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete Role successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
