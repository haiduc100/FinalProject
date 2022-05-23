const RequestReturning = require("../models/requestReturn.model");

module.exports.getAllRequestReturn = async (req, res) => {
  try {
    const requestReturning = await RequestReturning.find();

    res.status(200).json(requestReturning);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
