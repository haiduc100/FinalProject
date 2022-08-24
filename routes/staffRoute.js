const router = require("express").Router();
const controller = require("../controllers/staffController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllAssetAvailable);
router.get(
  "/requestbynew",
  checkController.checkLogin,
  controller.getAllRequestByNew
);
module.exports = router;
