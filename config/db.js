const mongoose = require('mongoose');

require('dotenv').config(); // Import de dotenv et chargement des variables d'environnement

// Fonction pour se connecter à la base de données
async function connectDB() {
  try {
    // Se connecter à MongoDB en utilisant l'URI spécifié dans les variables d'environnement
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connecté');
  } catch (error) {
    // En cas d'erreur de connexion, afficher l'erreur et quitter l'application
    console.error('Erreur lors de la connexion à MongoDB :', error.message);
    process.exit(1); // Quitter l'application en cas d'erreur de connexion
  }
}

module.exports = connectDB; // Exporter la fonction de connexion à la base de données
