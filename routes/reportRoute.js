const router = require("express").Router();
const controller = require("../controllers/reportController");
router.get("/api", controller.getRequestReturnReport);

module.exports = router;
