const router = require("express").Router();
const controller = require("../controllers/staffController");
// const checkController = require("../middlewares/checkController");

router.get("/", controller.getAllAssetAvailable);
module.exports = router;
