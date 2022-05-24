const router = require("express").Router();
const controller = require("../controllers/requestReturningController");

router.get("/api", controller.getAllRequestReturn);
router.post("/api", controller.createRequestReturning);
router.put("/api/:id", controller.updateRequestReturning);
module.exports = router;
