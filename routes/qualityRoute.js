const router = require("express").Router();
const controller = require("../controllers/qualityController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllQuality
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getQualityById
);
router.get("/api/_latest/:id", controller.getLatestQuality);
router.get("/api/_latestexport/:id", controller.getLatestExportQuality);

router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createQuality
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateQuality
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteQuality
);

module.exports = router;
