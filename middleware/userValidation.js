const validatePassword = require('../utils/passwordUtils');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

function validateUserInput(req, res, next) {
  const { firstName, lastName, email, password, teacherGroup } = req.body;
  
  // Vérifier si les champs obligatoires sont présents pour les étudiants et les enseignants
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  // Vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format d'email invalide" });
  }

  // Vérifier la force du mot de passe
  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre, un chiffre et un caractère spécial" });
  }

  // Validation supplémentaire spécifique aux enseignants
  if (req.url.includes('/teachers')) {
    if (!teacherGroup) {
      return res.status(400).json({ error: "Groupe d'enseignants manquant" });
    }
    // Ajoutez ici toute validation supplémentaire spécifique aux enseignants
  }
  
  // Passer au middleware suivant ou au gestionnaire de route
  next();
}

// Middleware fonctionnel pour vérifier si le nom du module est unique pour le rôle spécifié
const checkUniqueModuleName = (role) => async (req, res, next) => {
  try {
    const { userId } = req.query; // Extraire userId des paramètres de la requête
    const modulesData = req.body.modules; // Supposons que les données des modules soient envoyées dans un tableau nommé 'modules'

    // Trouver l'utilisateur par ID en fonction du rôle
    let User;
    if (role === 'teacher') {
      User = Teacher;
    } else if (role === 'student') {
      User = Student;
    } else {
      return res.status(400).json({ message: 'Rôle spécifié invalide' });
    }

    // Trouver l'utilisateur par ID
    const user = await User.findById(userId).populate('modules');
    if (!user) {
      return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} introuvable` });
    }

    // Si les données des modules ne sont pas envoyées sous forme de tableau, les convertir en tableau pour simplifier le traitement
    if (!Array.isArray(modulesData)) {
      modulesData = [modulesData];
    }

    // Vérifier si un module avec le même nom existe pour l'utilisateur
    for (const moduleData of modulesData) {
      const { moduleName } = moduleData;
      const existingModule = user.modules.find(module => module.moduleName === moduleName);

      if (existingModule) {
        return res.status(400).json({ message: `Le nom du module "${moduleName}" doit être unique pour l'utilisateur` });
      }
    }

    // Si le nom du module est unique, passer au middleware suivant ou au contrôleur
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {validateUserInput, checkUniqueModuleName};
