const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Function to connect to MongoDB
async function connectDB() {
  try {
    if (!mongoose.connection.readyState) {
      // Check if connection is not already established
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

// Teardown function to stop MongoDB instance
async function disconnectDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
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

    // Query database or check for expected data
    // For example:
    // const SomeModel = mongoose.model('SomeModel', new mongoose.Schema({ name: String }));
    // const doc = await SomeModel.findOne({ name: 'example' });
    // expect(doc).toBeNull(); // Assuming there's no such document, just to demonstrate querying
  });
});
