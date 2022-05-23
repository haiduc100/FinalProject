const controller = require("../controllers/userController");
const router = require("express").Router();

router.get("/api", controller.getAllUsers);

router.get("/api/:id", controller.getUserById);

router.post("/api", controller.createUser);

router.put("/api/:id", controller.updateUser);

router.delete("/api/:id", controller.deleteUser);

module.exports = router;
