const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
const NewAsset = require("../models/requestByNew.model");
module.exports.getAllAssetAvailable = async (req, res) => {
  try {
    const assets = await Asset.find({ State: "available" })
      .populate("Category")
      .limit(15);
    const listCategory = await Category.find({});
    const total = await Asset.find({ State: "available" })
      .populate("Category")
      .count();
    res.render("pages/user-home", {
      listAsset: assets,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};

module.exports.postRequestByAssetNew = async (req, res) => {
  try {
    const assets = await NewAsset.create({
      AssetName: req.body.AssetName,
      Amount: req.body.Amount,
      Category: req.body.Category,
    });
    res.status(200).json({
      status: "Create asset successfully",
      data: assets,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};
module.exports.getFind = async (req, res) => {
  try {
    console.log(46, req.query);
    const assets = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    console.log(53, assets);
    if (assets) {
      const listCategory = await Category.find({});
      const total = await Asset.find({
        AssetName: { $regex: req.query.search, $options: "i" },
      })
        .populate("Category")
        .count();
      res.status(200).render("components/user/user-search", {
        listAsset: assets,
        listCategory: listCategory,
        total: Math.ceil(total / 15),
      });
    } else {
      const assets = await Asset.find({
        AssetName: { $regex: req.query.search, $options: "i" },
      })
        .populate("Category")
        .limit(15);

      const listCategory = await Category.find({});
      const total = await Asset.find({
        AssetName: { $regex: req.query.search, $options: "i" },
      })
        .populate("Category")
        .count();
      res.status(200).render("components/user/user-search", {
        listAsset: assets,
        listCategory: listCategory,
        total: Math.ceil(total / 15),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getFindCategory = async (req, res) => {
  try {
    const assets = await Asset.find({
      Category: req.query.search,
      State: "available",
      $options: "i",
    })
      .populate("Category")
      .limit(15);
    const listCategory = await Category.find({});
    const total = await Asset.find({
      Category: req.query.search,
      State: "available",
      $options: "i",
    })
      .populate("Category")
      .count();
    res.status(200).render("components/user/user-category", {
      listAsset: assets,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getPagination = async (req, res) => {
  try {
    const listPagination = await Asset.find({ State: "available" })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    const listCategory = await Category.find({});

    res.render("components/user/user-pagination", {
      listAsset: listPagination,
      listCategory: listCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};

module.exports.getPaginationSearch = async (req, res) => {
  try {
    const listPagination = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    const listCategory = await Category.find({});
    const total = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    })
      .populate("Category")
      .count();

    res.render("components/user/user-pagination", {
      listAsset: listPagination,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};
