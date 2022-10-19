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
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createRequestRepair
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
