const mongoose = require('mongoose');

// Schéma d'étudiant
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  modules: [String]
});

// Modèle d'étudiant
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
