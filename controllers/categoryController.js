const Category = require("../models/category.model");
const { Paginate } = require("../services/paginationServices");
module.exports.getAllCategories = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const paginateData = await Paginate(
      Category,
      {},
      {},
      req.query.page,
      req.query.pageSize,
      []
    );
    res.status(200).render("components/admin/categoryManagementPage", {
      listCategory: paginateData.data,
      staff: req.staff,
      currentRole: req.RoleName,
      role: req.Role.Role,
      totalPages: paginateData.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getCategorieById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      CategoryName: req.body.CategoryName,
    });

    if (category) {
      return res
        .status(400)
        .json({ status: "Fail", message: "Category already exists!!!" });
    }
    const newCategory = await Category.create(req.body);

    res.status(200).json({
      status: "success",
      data: { newCategory },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find category",
      });
    }
    const newCategory = await Category.updateOne(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "success",
      data: { newCategory },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find category",
      });
    }

    await Category.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete category successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
