const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7x3of.mongodb.net/AssetManagement?retryWrites=true&w=majority`
  // "mongodb://localhost:27017/AssetManagement"
);

module.exports = mongoose;
