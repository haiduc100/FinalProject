const router = require("express").Router();
const controller = require("../controllers/userController");
const LOGIN_USER_ = require("../controllers/LogInUserController");
const LOGIN_ADMIN_ = require("../controllers/LogInAdminController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllUsers);

router.get("/api/:id", checkController.checkLogin, controller.getUserById);

router.post("/api", checkController.checkLogin, controller.createUser);

router.put("/api/:id", checkController.checkLogin, controller.updateUser);

router.delete("/api/:id", checkController.checkLogin, controller.deleteUser);

//LogInUser
router.post("/LogIn", LOGIN_USER_.LogInUser);
//html user
router.get("/login", LOGIN_USER_.getAllAssignmentsLogInUser);

//admin
router.post("/LogInAdmin", LOGIN_ADMIN_.LogInAdmin);
//html admin
router.get("/loginAdmin", LOGIN_ADMIN_.getAllAssignmentsLogInAdmin);

module.exports = router;
