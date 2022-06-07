const router = require("express").Router();
const controller = require("../controllers/homeController");
const CHECK_ROLE = require('../middlewares/checkrole') 
const CHECK_LOGIN = require('../middlewares/checkController') 

router.get("/", controller.getAllAssetAvailable);
router.get("/find", controller.getFind);
router.post("/requestByAssetNew", controller.postRequestByAssetNew);
router.get("/findCategory", controller.getFindCategory);
router.get("/pagination", controller.getPagination);
router.get("/paginationSearch", controller.getPaginationSearch);
module.exports = router;
