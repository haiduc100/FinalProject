const router = require("express").Router();

const indexRoute = require("./indexRoute");
router.use("/", indexRoute);

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

const requestByNewRoute = require("./requestByNewRoute");
router.use("/requestByNew", requestByNewRoute);

const userRoute = require("./userRoute");
router.use("/user", userRoute);

module.exports = router;
