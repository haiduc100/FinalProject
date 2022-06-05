const router = require("express").Router();
const controller = require("../controllers/assignmentController");
const CHECK_LOGIN = require('../middlewares/checkController') 



router.get("/", CHECK_LOGIN.checkLogin,controller.getAllAssignments);
router.get("/api/:id", CHECK_LOGIN.checkLogin,controller.getAssignmentById);
router.post("/api", CHECK_LOGIN.checkLogin,controller.createAssignment);
router.put("/api/:id", CHECK_LOGIN.checkLogin,controller.updateAssignment);
router.delete("/api/:id", CHECK_LOGIN.checkLogin,controller.deleteAssignment);
module.exports = router;
