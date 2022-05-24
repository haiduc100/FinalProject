const router = require("express").Router();
const controller = require("../controllers/requestByNewController");

router.get("/api", controller.getAllRequestByNew);
router.post("/api", controller.createRequestByNew);
router.put("/api/:id", controller.updateRequestByNew);

module.exports = router;
