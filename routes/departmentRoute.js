const router = require("express").Router();
const controller = require("../controllers/departmentController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllDepartment
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  controller.getDepartmentById
);
router.post("/api", checkController.checkLogin, controller.createDepartment);
router.put("/api/:id", checkController.checkLogin, controller.updateDepartment);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  controller.deleteDepartment
);
module.exports = router;
