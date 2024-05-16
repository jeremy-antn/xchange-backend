const bcrypt = require('bcrypt');
const Student = require('../models/studentModel');
const studentUtils = require('../utils/studentUtils');
const { studentModuleController } = require('../controllers/studentModuleController');

// Créer un nouvel étudiant
exports.createStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'L\'email existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newStudent.save();

    const studentResponse = newStudent.toObject();
    delete studentResponse.password;
    delete studentResponse._id;
    delete studentResponse.__v;

    res.status(201).json({
      message: 'Compte étudiant créé avec succès.',
      student: studentResponse
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les étudiants
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({}, '-password -__v');
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// Récupérer un étudiant par son ID
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id, '-password -__v');
    if (!student) {
      return res.status(404).json({ message: 'Étudiant introuvable' });
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour les infos d'un étudiant
exports.updateStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, studentGroup} = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      studentGroup
    }, { new: true, select: '-password -__v' });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Étudiant introuvable' });
    }
    res.status(200).json({ message: 'Étudiant mis à jour avec succès', student: updatedStudent });
  } catch (error) {
    next(error);
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Étudiant introuvable' });
    }
    res.status(200).json({ message: 'Étudiant supprimé avec succès'});
  } catch (error) {
    next(error);
  }
};
