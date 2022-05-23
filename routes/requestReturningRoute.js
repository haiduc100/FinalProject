const router = require("express").Router();
const controller = require("../controllers/requestReturningController");

router.get("/api", controller.getAllRequestReturn);
module.exports = router;
