const Asset = require("../models/asset.model");
const Category = require("../models/category.model");
module.exports.getAllAsset = async (req, res) => {
  try {
    const asset = await Asset.find({}).populate("Category");
    const category = await Category.find({});
    res.render("components/admin/assetManagementPage", {
      listAssets: asset,
      listCategory: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.filterAsset = async (req, res) => {
  try {
    const assets = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    }).populate("Category");
    const category = await Category.find({});

    res.status(200).render("components/admin/assetFilterPage", {
      listAssets: assets,
      listCategory: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id });

    res.status(200).json({
      asset,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createAsset = async (req, res) => {
  try {
    const AssetDate = new Date().getFullYear() + Number(req.body.AssetDate);
    req.body.AssetDate = AssetDate;
    const newAsset = await Asset.create(req.body);

    res.status(200).json({
      status: "Create asset successfully",
      data: newAsset,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find asset",
      });
    }

    await Asset.updateOne({ _id: req.params.id }, req.body);
    const newAsset = await Asset.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: newAsset,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        status: "Fail",
        message: "Can not find asset",
      });
    }
    if (asset.State === "unavailable") {
      const delAsset = await Asset.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        data: { delAsset },
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Asset must be unavailable",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
