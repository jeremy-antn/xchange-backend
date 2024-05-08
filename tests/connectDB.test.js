const mongoose = require('mongoose');
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils'); // Import test utilities

let mongoServer;

// Function to connect to MongoDB
async function connectDB() {
  try {
    if (!mongoose.connection.readyState) {
      // Check if connection is not already established
      await connectToTestDB(); // Connect to the test database
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

// Teardown function to stop MongoDB instance
async function disconnectDB() {
  await disconnectFromTestDB(); // Disconnect from the test database
}

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Database Connection', () => { 
  it('connects to the database', async () => {
    // Act
    await connectDB();

    // Assert
    expect(mongoose.connection.readyState).toBe(1); // Connection ready state is 1 for connected

  });
});
