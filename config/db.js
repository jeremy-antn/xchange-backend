// config/db.js

const mongoose = require('mongoose');

// Function to connect to the database
async function connectDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/xchange');

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application in case of connection error
  }
}

module.exports = connectDB;
