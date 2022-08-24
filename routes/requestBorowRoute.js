const router = require("express").Router();
const controller = require("../controllers/requestBorrowController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllRequestBorrow);
router.get("/api/:id", checkController.checkLogin, controller.getRequestById);
router.post("/api", checkController.checkLogin, controller.createRequestBorrow);
router.put(
  "/api/:id",
  checkController.checkLogin,
  controller.updateRequestBorrow
);

module.exports = router;
