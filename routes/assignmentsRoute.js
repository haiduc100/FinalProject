const router = require("express").Router();
const controller = require("../controllers/assignmentController");
const CHECK_LOGIN = require('../middlewares/checkController') 

router.get("/", controller.getAllAssignments);
router.get("/api/:id", controller.getAssignmentById);
router.post("/api", controller.createAssignment);
router.put("/api/:id", controller.updateAssignment);
router.delete("/api/:id", controller.deleteAssignment);
module.exports = router;
