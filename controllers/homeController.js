const User = require("../models/user.model");
const Asset = require("../models/asset.model");
module.exports.getAllUser = async (req, res) => {
  try {
    const assets = await Asset.find({ State: "available" }).populate(
      "Category"
    );
    res.render("pages/home", { listAsset: assets });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};
