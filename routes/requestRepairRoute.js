const router = require("express").Router();
const controller = require("../controllers/requestRepairController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllRequestRepair
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getRequestRepairById
);
router.post(
  "/api/_stocker",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createRequestRepairByStocker
);
router.post(
  "/api/_staff",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createRequestRepairByStaff
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateRequestRepair
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteRequestRepair
);

module.exports = router;
