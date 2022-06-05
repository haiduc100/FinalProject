const router = require("express").Router();
const controller = require("../controllers/reportController");
const CHECK_LOGIN = require('../middlewares/checkController') 




router.get("/api", CHECK_LOGIN.checkLogin,controller.getRequestReturnReport);

module.exports = router;
