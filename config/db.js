// config/db.js

const mongoose = require('mongoose');

require('dotenv').config(); // Import de dotenv et chargement des variables d'environnement

// Function to connect to the database
async function connectDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application in case of connection error
  }
}

module.exports = connectDB;
