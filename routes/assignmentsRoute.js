const router = require("express").Router();
const controller = require("../controllers/assignmentController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllAssignments);
router.get(
  "/api/:id",
  checkController.checkLogin,
  controller.getAssignmentById
);
router.post("/api", checkController.checkLogin, controller.createAssignment);
router.put("/api/:id", checkController.checkLogin, controller.updateAssignment);
router.put(
  "/api/_returning/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateAssignmentReturnState
);
router.put(
  "/api/_repair/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateAssignmentByRequestRepair
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  controller.deleteAssignment
);
module.exports = router;
