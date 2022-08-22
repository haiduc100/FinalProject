const Department = require("../models/department.model");
const { Paginate } = require("../services/paginationServices");
module.exports.getAllDepartment = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      Department,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      []
    );
    res.status(200).render("components/admin/departmentManagementPage", {
      listDepartments: paginateData.data,
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

module.exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id });

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({
      DepartmentName: req.body.DepartmentName,
    });

    if (department) {
      return res
        .status(400)
        .json({ status: "Fail", message: "Department already exists!!!" });
    }
    const newDepartment = await Department.create(req.body);

    res.status(200).json({
      status: "success",
      data: { newDepartment },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id });
    if (!department) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Department",
      });
    }
    const newDepartment = await Department.updateOne(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "success",
      data: { newDepartment },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find Department",
      });
    }

    await Department.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete Department successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
