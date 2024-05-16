const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import de la fonction de connexion à la base de données
const studentRoutes = require('./routes/studentRoutes'); // Import des routes liées aux étudiants
const teacherRoutes = require('./routes/teacherRoutes'); // Import des routes liées aux professeurs

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Cette ligne ajoute un middleware pour analyser les corps JSON

// Connexion à la base de données
connectDB();

// Définition des routes

// Routes des professeurs
app.use('/xchange/api/', teacherRoutes);

// Routes pour les étudiants
app.use('/xchange/api/', studentRoutes);

// Gestion des erreurs 404 (Non trouvé)
app.use((req, res, next) => {
  const error = new Error('Non trouvé');
  error.status = 404;
  next(error);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
