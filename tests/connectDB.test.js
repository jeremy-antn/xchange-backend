const mongoose = require('mongoose');
const { connectToTestDB, disconnectFromTestDB } = require('../tests/utils/testUtils'); // Importer les utilitaires de test

let mongoServer;

// Fonction pour se connecter à MongoDB
async function connectDB() {
  try {
    if (!mongoose.connection.readyState) {
      // Vérifier si la connexion n'est pas déjà établie
      await connectToTestDB(); // Se connecter à la base de données de test
      console.log('MongoDB connecté');
    }
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
}

// Fonction de nettoyage pour arrêter l'instance MongoDB
async function disconnectDB() {
  await disconnectFromTestDB(); // Se déconnecter de la base de données de test
}

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Connexion à la base de données', () => { 
  it('se connecte à la base de données', async () => {
    // Action
    await connectDB();

    // Vérification
    expect(mongoose.connection.readyState).toBe(1); // L'état de connexion prêt est 1 pour connecté
  });
});
