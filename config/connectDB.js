const mongoose = require("mongoose");

connectDB = async () => {
  await mongoose.connect(
    // `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7x3of.mongodb.net/AssetManagement?retryWrites=true&w=majority`

    "mongodb://localhost:27017/ExpressDemo"

    // "mongodb://localhost:4000/ExpressDemo"
  );
};

connectDB();
