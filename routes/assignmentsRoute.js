const router = require("express").Router();
const controller = require("../controllers/assignmentController");

router.get("/", controller.getAllAssignments);
router.post("/api", controller.createAssignment);
router.put("/api/:id", controller.updateAssignment);
router.delete("/api/:id", controller.deleteAssignment);
module.exports = router;
