const router = require("express").Router();
const controller = require("../controllers/assetController");

router.get("/", controller.getAllAsset);
router.get("/filter", controller.filterAsset);
router.get("/api/:id", controller.getAssetById);
router.post("/api", controller.createAsset);
router.put("/api/:id", controller.updateAsset);
router.delete("/api/:id", controller.deleteAsset);

module.exports = router;
