const router = require("express").Router();
const controller = require("../controllers/requestReturningController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllRequestReturn);
router.get(
  "/api/:id",
  checkController.checkLogin,
  controller.getRequestReturnById
);
router.post(
  "/api",
  checkController.checkLogin,
  controller.createRequestReturning
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  controller.updateRequestReturning
);
router.put(
  "/api/_denied/:id",
  checkController.checkLogin,
  controller.DeniedRequestReturning
);
module.exports = router;
