const router = require("express").Router();
const controller = require("../controllers/userController");
const loginUserController = require("../controllers/LogInUserController");
const loginAdminController = require("../controllers/LogInAdminController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllUsers);

router.get("/api/:id", checkController.checkLogin, controller.getUserById);

router.post("/api", checkController.checkLogin, controller.createUser);

router.put("/api/:id", checkController.checkLogin, controller.updateUser);

router.delete("/api/:id", checkController.checkLogin, controller.deleteUser);

//LogInUser
router.post("/LogIn", loginUserController.LogInUser);
//html user
router.get("/login", loginUserController.getLoginPage);

//admin
router.post("/LogInAdmin", loginAdminController.LogInAdmin);
//html admin
router.get("/loginAdmin", loginAdminController.getLoginPage);

router.post("/api/_logout", checkController.checkLogin, controller.logOut);
router.post(
  "/api/_changepass/:id",
  checkController.checkLogin,
  controller.changePassword
);

module.exports = router;
