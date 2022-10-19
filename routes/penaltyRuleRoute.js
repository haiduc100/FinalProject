const router = require("express").Router();
const controller = require("../controllers/penaltyRuleController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllpenaltyRule
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getpenaltyRuleById
);
router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createpenaltyRule
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updatepenaltyRule
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deletepenaltyRule
);

module.exports = router;
