const router = require("express").Router();
const controller = require("../controllers/assetController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllAsset
);
router.get(
  "/filter",
  checkController.checkLogin,
  checkController.checkRole,
  controller.filterAsset
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAssetById
);
router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createAsset
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateAsset
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteAsset
);

module.exports = router;
