const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/user/LogIn");
});

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

const requestBuyNewRoute = require("./requestBuyNewRoute");
router.use("/requestBuyNew", requestBuyNewRoute);

const requestBorowRoute = require("./requestBorowRoute");
router.use("/requestBorrow", requestBorowRoute);

const userRoute = require("./userRoute");
router.use("/user", userRoute);

module.exports = router;
