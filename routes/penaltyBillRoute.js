const router = require("express").Router();
const controller = require("../controllers/penaltyBillController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllPenalty
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getPenaltyById
);
router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createPenalty
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updatePenalty
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deletePenalty
);

module.exports = router;
