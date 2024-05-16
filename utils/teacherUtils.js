const Teacher = require('../models/teacherModel');

// Fonction utilitaire pour trouver un professeur par ID
exports.findTeacherById = async (userId) => {
  try {
    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      throw new Error('Professeur non trouvé');
    }
    return teacher;
  } catch (error) {
    throw error;
  }
};
