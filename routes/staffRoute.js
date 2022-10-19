const router = require("express").Router();
const controller = require("../controllers/staffController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllAssetAvailable);
router.get(
  "/assignment",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllAssignment
);
router.get(
  "/RequestBuyNew",
  checkController.checkLogin,
  controller.getAllRequestBuyNew
);

router.get(
  "/requestborrow",
  checkController.checkLogin,
  controller.getAllRequestBorrow
);
router.get(
  "/requestreturn",
  checkController.checkLogin,
  controller.getAllRequestReturn
);
router.get(
  "/account",
  checkController.checkLogin,
  controller.getAllAccountInformation
);
module.exports = router;
