// This file contains default values
// Create a .env file in the backend root folder for actual values
// Copy this content to your .env file:

// PORT=5000
// ATLAS_MONGO_URL=mongodb+srv://SigmaUser:98TX62kstqfxWcL9@cluster0.ez0e2.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0
// JWT_SECRET=23dfhsfbsm53487

module.exports = {
  PORT: process.env.PORT || 5000,
  ATLAS_MONGO_URL: process.env.ATLAS_MONGO_URL || 'mongodb+srv://SigmaUser:98TX62kstqfxWcL9@cluster0.ez0e2.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || '23dfhsfbsm53487'
};








