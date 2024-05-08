const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function connectToTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromTestDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports = {
  connectToTestDB,
  disconnectFromTestDB,
};
