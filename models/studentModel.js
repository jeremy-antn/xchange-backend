const mongoose = require('mongoose');

// Schema for a student
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentGroup: { type: String, default: '' },
  modules: [
    {
      moduleName: { type: String, unique: true }, // Added unique
      description: { type: String },
    },
  ],
});

// Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
