const router = require("express").Router();
const controller = require("../controllers/homeController");
const CHECK_ROLE = require('../middlewares/checkrole') 
const CHECK_LOGIN = require('../middlewares/checkController') 



router.get("/", CHECK_LOGIN.checkLogin,CHECK_ROLE.checkRole, controller.getAllUser);
module.exports = router;
