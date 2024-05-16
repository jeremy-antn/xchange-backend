const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

const teacherAuthorizationMiddleware = async (req, res, next) => {
  try {
    const { teacherId, studentId } = req.params;

    // Rechercher l'enseignant par ID
    const teacher = await Teacher.findById(teacherId);

    // Vérifier si l'enseignant existe et s'il est autorisé
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    // Si autorisé, passer au middleware suivant ou au gestionnaire de route
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = teacherAuthorizationMiddleware;
