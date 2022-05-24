const RequestByNew = require("../models/requestByNew.model");

module.exports.getAllRequestByNew = async (req, res) => {
  try {
    const request = await RequestByNew.find({});

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.createRequestByNew = async (req, res) => {
  try {
    const request = await RequestByNew.create(req.body);

    res.status(200).json({
      status: "Create Request By New successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.updateRequestByNew = async (req, res) => {
  try {
    const request = await RequestByNew.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "Update Request By New successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
