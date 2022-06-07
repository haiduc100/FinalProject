const router = require("express").Router();
const controller = require("../controllers/requestByNewController");
const CHECK_LOGIN = require('../middlewares/checkController') 

router.get("/", controller.getAllRequestByNew);
router.get("/api/:id", controller.getRequestById);
router.post("/api", controller.createRequestByNew);
router.put("/api/:id", controller.updateRequestByNew);

module.exports = router;
