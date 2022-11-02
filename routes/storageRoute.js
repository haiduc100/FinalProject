const router = require("express").Router();
const controller = require("../controllers/storageController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllStorage
);
router.get("/api/_quality/:id", controller.getQualityByAssignmentId);

router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getStorageById
);
router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createStorage
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateStorage
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteStorage
);

module.exports = router;
