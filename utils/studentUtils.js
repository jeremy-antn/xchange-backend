const Student = require('../models/studentModel');

// Fonction utilitaire pour trouver un étudiant par ID
exports.findStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  } catch (error) {
    throw error;
  }
};
