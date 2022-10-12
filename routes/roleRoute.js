const router = require("express").Router();
const controller = require("../controllers/roleController");
const checkController = require("../middlewares/checkController");

router.get(
  "/",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getAllRole
);

router.post(
  "/api",
  checkController.checkLogin,
  checkController.checkRole,
  controller.createRole
);
router.get(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.getRoleById
);
router.put(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.updateRole
);
router.delete(
  "/api/:id",
  checkController.checkLogin,
  checkController.checkRole,
  controller.deleteRole
);
module.exports = router;
