const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentGroup: { type: String, default: '' },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }] // Référence aux modules suivis par l'étudiant
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
