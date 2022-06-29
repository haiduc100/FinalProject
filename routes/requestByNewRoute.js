const router = require("express").Router();
const controller = require("../controllers/requestByNewController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllRequestByNew);
router.get("/api/:id", checkController.checkLogin, controller.getRequestById);
router.post("/api", checkController.checkLogin, controller.createRequestByNew);
router.put(
  "/api/:id",
  checkController.checkLogin,
  controller.updateRequestByNew
);

module.exports = router;
