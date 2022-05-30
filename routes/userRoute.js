const controller = require("../controllers/userController");
const router = require("express").Router();

router.get("/api", controller.getAllUsers);

router.get("/api/:id", controller.getUserById);

router.post("/api", controller.createUser);

router.put("/api/:id", controller.updateUser);

router.delete("/api/:id", controller.deleteUser);

//HungXoan - LogInUser
router.post("/LogIn", controller.LogInUser);
//html user
router.get('/login', controller.getAllAssignmentsLogInUser);

//admin
router.post("/LogInAdmin", controller.LogInAdmin);
//html admin
router.get('/loginAdmin', controller.getAllAssignmentsLogInAdmin);

//register
// router.post("/Register", controller.Register);
//html register
router.get('/register', controller.getAllAssignmentsRegister);

module.exports = router;
