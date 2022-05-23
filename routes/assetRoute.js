const router = require("express").Router();
const controller = require("../controllers/assetController");

router.get("/api", controller.getAllAsset);
router.post("/api", controller.createAsset);
router.put("/api/:id", controller.updateAsset);
router.delete("/api/:id", controller.deleteAsset);

module.exports = router;
