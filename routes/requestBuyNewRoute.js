const router = require("express").Router();
const controller = require("../controllers/requestBuyNewController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllRequestBuyNew);
router.get("/api/:id", checkController.checkLogin, controller.getRequestById);
router.post("/api", checkController.checkLogin, controller.createRequestBuyNew);
router.put(
  "/api/:id",
  checkController.checkLogin,
  controller.updateRequestBuyNew
);

module.exports = router;
