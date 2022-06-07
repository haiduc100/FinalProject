const router = require("express").Router();
const controller = require("../controllers/requestReturningController");
const CHECK_LOGIN = require('../middlewares/checkController') 

router.get("/", controller.getAllRequestReturn);
router.get("/api/:id", controller.getRequestReturnById);
router.post("/api", controller.createRequestReturning);
router.put("/api/:id", controller.updateRequestReturning);
module.exports = router;
