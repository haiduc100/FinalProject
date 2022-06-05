const router = require("express").Router();
const controller = require("../controllers/requestReturningController");
const CHECK_LOGIN = require('../middlewares/checkController') 




router.get("/", CHECK_LOGIN.checkLogin,controller.getAllRequestReturn);
router.get("/api/:id", CHECK_LOGIN.checkLogin,controller.getRequestReturnById);
router.post("/api", CHECK_LOGIN.checkLogin,controller.createRequestReturning);
router.put("/api/:id", CHECK_LOGIN.checkLogin,controller.updateRequestReturning);
module.exports = router;
