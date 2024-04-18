const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import de la fonction de connexion à la base de données
const studentRoutes = require('./routes/studentRoutes'); // Import des routes liées aux étudiants

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connexion à la base de données
connectDB();

// Définition des routes
app.use('/xchange/api/', studentRoutes);

// Gestion des erreurs 404 (Not Found)
app.use((req, res, next) => {
  const error = new Error('Not Found');
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
  console.log(`Server is running on port ${PORT}`);
});
