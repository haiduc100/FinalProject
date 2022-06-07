const router = require("express").Router();
const CONTROLLER_ = require("../controllers/userController");
const LOGIN_USER_ = require("../controllers/LogInUserController");
const LOGIN_ADMIN_ = require("../controllers/LogInAdminController");
const REGIGISTER_ = require("../controllers/RegisterController");
const CHECK_ = require("../middlewares/checkrole");
const CHECK_DUPP = require("../middlewares/checkController");
const CHECK_LOGIN = require("../middlewares/checkController");

router.get("/", CHECK_LOGIN.checkLogin, CONTROLLER_.getAllUsers);

router.get("/api/:id", CHECK_LOGIN.checkLogin, CONTROLLER_.getUserById);

router.post("/api", CHECK_LOGIN.checkLogin, CONTROLLER_.createUser);

router.put("/api/:id", CHECK_LOGIN.checkLogin, CONTROLLER_.updateUser);

router.delete("/api/:id", CHECK_LOGIN.checkLogin, CONTROLLER_.deleteUser);

//HungXoan - LogInUser
router.post("/LogIn", LOGIN_USER_.LogInUser);
//html user
router.get("/login", LOGIN_USER_.getAllAssignmentsLogInUser);

//admin
router.post("/LogInAdmin", LOGIN_ADMIN_.LogInAdmin);
//html admin
router.get("/loginAdmin", LOGIN_ADMIN_.getAllAssignmentsLogInAdmin);

//register
router.post("/Register", CHECK_DUPP.checkDuplicate, REGIGISTER_.Register);
//html register
router.get("/register", REGIGISTER_.getAllAssignmentsRegister);

module.exports = router;
