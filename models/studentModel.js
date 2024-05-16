const mongoose = require('mongoose');

// Schema d'un étudiant
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentGroup: { type: String, default: '' },
  modules: [
    {
      moduleName: { type: String, unique: true }, // Unique ajouté
      description: { type: String },
    },
  ],
});

// Modèle d'un étudiant
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
