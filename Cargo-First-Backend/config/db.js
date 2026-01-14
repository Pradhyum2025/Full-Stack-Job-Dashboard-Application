const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.ATLAS_MONGO_URL;
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

