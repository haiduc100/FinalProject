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
  "/staff",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllRequestRepairByStaff
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
  controller.createRequestRepairByStaff
);
router.put(
  "/api/_director/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateRequestRepairByDirector
);
router.put(
  "/api/_stocker/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateRequestRepairByStocker
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteRequestRepair
);

module.exports = router;
