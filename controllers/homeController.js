const User = require("../models/user.model");

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};
