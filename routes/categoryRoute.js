const router = require("express").Router();
const controller = require("../controllers/categoryController");
const CHECK_LOGIN = require("../middlewares/checkController");

router.get("/", CHECK_LOGIN.checkLogin, controller.getAllCategories);
router.get("/api/:id", CHECK_LOGIN.checkLogin, controller.getCategorieById);
router.post("/api", CHECK_LOGIN.checkLogin, controller.createCategory);
router.put("/api/:id", CHECK_LOGIN.checkLogin, controller.updateCategory);
router.delete("/api/:id", CHECK_LOGIN.checkLogin, controller.deleteCategory);

module.exports = router;
