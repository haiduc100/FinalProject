const router = require("express").Router();
const controller = require("../controllers/requestByNewController");
const CHECK_LOGIN = require("../middlewares/checkController");

router.get("/", CHECK_LOGIN.checkLogin, controller.getAllRequestByNew);
router.get("/api/:id", CHECK_LOGIN.checkLogin, controller.getRequestById);
router.post("/api", CHECK_LOGIN.checkLogin, controller.createRequestByNew);
router.put("/api/:id", CHECK_LOGIN.checkLogin, controller.updateRequestByNew);

module.exports = router;
