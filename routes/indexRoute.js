const router = require("express").Router();
const controller = require("../controllers/homeController");
const CHECK_ROLE = require("../middlewares/checkrole");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllAssetAvailable);
router.get("/find", checkController.checkLogin, controller.getFind);
router.post(
  "/requestByAssetNew",
  checkController.checkLogin,
  controller.postRequestByAssetNew
);
router.get(
  "/findCategory",
  checkController.checkLogin,
  controller.getFindCategory
);
router.get("/pagination", checkController.checkLogin, controller.getPagination);
router.get(
  "/paginationSearch",
  checkController.checkLogin,
  controller.getPaginationSearch
);
module.exports = router;
