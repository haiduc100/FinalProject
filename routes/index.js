const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/user/LogIn");
});
const indexRoute = require("./indexRoute");
router.use("/home", indexRoute);

const staffRoute = require("./staffRoute");
router.use("/staff", staffRoute);

const departmentRoute = require("./departmentRoute");
router.use("/department", departmentRoute);

const assetRoute = require("./assetRoute");
router.use("/asset", assetRoute);

const assignmentsRoute = require("./assignmentsRoute");
router.use("/assignments", assignmentsRoute);

const categoryRoute = require("./categoryRoute");
router.use("/category", categoryRoute);

const reportRoute = require("./reportRoute");
router.use("/report", reportRoute);

const requestReturningRoute = require("./requestReturningRoute");
router.use("/requestReturning", requestReturningRoute);

const RequestBuyNewRoute = require("./RequestBuyNewRoute");
router.use("/RequestBuyNew", RequestBuyNewRoute);

const requestBorowRoute = require("./requestBorowRoute");
router.use("/requestBorrow", requestBorowRoute);

const userRoute = require("./userRoute");
router.use("/user", userRoute);

const roleRoute = require("./roleRoute");
router.use("/role", roleRoute);

const storageRoute = require("./storageRoute");
router.use("/storage", storageRoute);

const requestRepairRoute = require("./requestRepairRoute");
router.use("/requestRepair", requestRepairRoute);

const penaltyRuleRoute = require("./penaltyRuleRoute");
router.use("/penaltyRule", penaltyRuleRoute);

const penaltyBillRoute = require("./penaltyBillRoute");
router.use("/penaltyBill", penaltyBillRoute);

module.exports = router;
