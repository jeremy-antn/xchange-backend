const Student = require('../models/studentModel');

// Contrôleur pour la création d'un nouvel étudiant
exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Vérifier si l'email est déjà utilisé
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Créer un nouvel étudiant
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password, // Dans une application réelle, vous devriez hasher le mot de passe
    });

    // Enregistrer l'étudiant dans la base de données
    await newStudent.save();

    // Réponse réussie
    res.status(201).json({
      message: 'Student account created successfully.',
      student: newStudent
    });
  } catch (error) {
    // Gérer les erreurs
    next(error);
  }
};
