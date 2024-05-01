const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacherGroup: { type: String, required: true },
  modules: { type: [String], default: [] }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;