const assetModel = require("../models/asset.model");
const Asset = require("../models/asset.model");
const Category = require("../models/category.model");
const storageModel = require("../models/storage.model");
const qualityModel = require("../models/quality.model");
const userModel = require("../models/user.model");
const { Paginate } = require("../services/paginationServices");

module.exports.getAllAsset = async (req, res) => {
  try {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const category = await Category.find({});

    const paginateData = await Paginate(
      Asset,
      {},
      { updatedAt: -1 },
      req.query.page,
      req.query.pageSize,
      ["Category"]
    );

    res.render("components/admin/assetManagementPage", {
      listAssets: paginateData.data,
      listCategory: category,
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

module.exports.filterAsset = async (req, res) => {
  try {
    const assets = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    }).populate("Category");
    const category = await Category.find({});

    res.status(200).render("components/admin/assetFilterPage", {
      listAssets: assets,
      listCategory: category,
      staff: req.staff,
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
      data: asset,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createAsset = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.Category });

    // const newAsset = await Asset.create(req.body);
    let State = "available";
    let newCategory = req.body.Category;
    let AssetDate = req.body.AssetDate;
    let AssetName = req.body.AssetName;
    let Description = req.body.Description;
    let PurchaseDate = req.body.PurchaseDate;
    let Amount = req.body.Amount;

    for (let i = 0; i < Amount; i++) {
      let AssetCode = category.Prefix + Math.random().toString(36).substring(7);
      let newAsset = await Asset.create({
        State: State,
        Category: newCategory,
        Amount: Amount,
        AssetCode: AssetCode,
        PurchaseDate: PurchaseDate,
        Description: Description,
        AssetName: AssetName,
        AssetDate: AssetDate,
      });

      // Create quality
      await storageModel.create({
        AssetId: newAsset._id,
        Quality: 100,
        EvaluatedBy: staff._id,
      });
      // Create storage
      // await storageModel.create({
      //   RequestBuyNewId: req.body.RequestBuyNewId,
      //   StockerId: staff._id,
      //   Type: "import",
      // });
    }
    res.status(200).json({
      status: "Create asset successfully",
      // data: newAsset,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};
module.exports.createAssetByRequestBuyNew = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.Category });
    const staff = await userModel.findOne({ StaffCode: req.staff });
    // const newAsset = await Asset.create(req.body);
    let State = "available";
    let newCategory = req.body.Category;
    let AssetDate = req.body.AssetDate;
    let AssetName = req.body.AssetName;
    let Description = req.body.Description;
    let PurchaseDate = req.body.PurchaseDate;
    let Amount = req.body.Amount;

    for (let i = 0; i < Amount; i++) {
      let AssetCode = category.Prefix + Math.random().toString(36).substring(7);
      await Asset.create({
        State: State,
        Category: newCategory,
        Amount: Amount,
        AssetCode: AssetCode,
        PurchaseDate: PurchaseDate,
        Description: Description,
        AssetName: AssetName,
        AssetDate: AssetDate,
      }).then(async (data) => {
        // Create quality
        await qualityModel
          .create({
            AssetId: data._id,
            Quality: 100,
            EvaluatedBy: staff._id,
          })
          .then(async (data) => {
            // Create storage
            await storageModel.create({
              QualityId: data._id,
              RequestBuyNewId: req.body.RequestBuyNewId,
              StockerId: staff._id,
              Type: "import",
            });
          });
      });
    }
    res.status(200).json({
      status: "Create asset successfully",
      // data: newAsset,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error: error,
    });
  }
};

module.exports.updateAsset = async (req, res) => {
  try {
    const asset = await assetModel.findById(req.params.id);

    if (!asset) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find asset",
      });
    }
    const newAsset = await assetModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: newAsset,
    });
  } catch (error) {
    console.log(error);
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
