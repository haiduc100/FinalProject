const router = require("express").Router();
const controller = require("../controllers/categoryController");
const checkController = require("../middlewares/checkController");

router.get("/", checkController.checkLogin, controller.getAllCategories);
router.get("/api/:id", checkController.checkLogin, controller.getCategorieById);
router.post("/api", checkController.checkLogin, controller.createCategory);
router.put("/api/:id", checkController.checkLogin, controller.updateCategory);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  controller.deleteCategory
);

module.exports = router;
