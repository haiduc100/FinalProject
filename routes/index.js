const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/user/LogIn");
});
const indexRoute = require("./indexRoute");
router.use("/home", indexRoute);

const staffRoute = require("./staffRoute");
router.use("/staff", staffRoute);

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
