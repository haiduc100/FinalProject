const router = require("express").Router();
const controller = require("../controllers/assetController");
const CHECK_LOGIN = require("../middlewares/checkController");

router.get("/", CHECK_LOGIN.checkLogin, controller.getAllAsset);
router.get("/filter", CHECK_LOGIN.checkLogin, controller.filterAsset);
router.get("/api/:id", CHECK_LOGIN.checkLogin, controller.getAssetById);
router.post("/api", CHECK_LOGIN.checkLogin, controller.createAsset);
router.put("/api/:id", CHECK_LOGIN.checkLogin, controller.updateAsset);
router.delete("/api/:id", CHECK_LOGIN.checkLogin, controller.deleteAsset);

module.exports = router;
