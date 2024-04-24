const Student = require('../models/studentModel');

// Contrôleur pour la création d'un nouvel étudiant
exports.createStudent = async (req, res, next) => {
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
      password,
    });

    // Enregistrer l'étudiant dans la base de données
    await newStudent.save();

    // Supprimer les champs _id et __v de la réponse
    const studentResponse = newStudent.toObject();
    delete studentResponse.password;
    delete studentResponse._id;
    delete studentResponse.__v;

    // Réponse réussie
    res.status(201).json({
      message: 'Student account created successfully.',
      student: studentResponse
    });
  } catch (error) {
    // Gérer les erreurs
    next(error);
  }
};
