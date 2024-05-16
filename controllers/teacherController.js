const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherModel');
const teacherUtils = require('../utils/teacherUtils');

// Créer un nouveau professeur
exports.createTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, teacherGroup, password } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      firstName,
      lastName,
      email,
      teacherGroup,
      password: hashedPassword,
    });

    await newTeacher.save();

    const teacherResponse = newTeacher.toObject();
    delete teacherResponse.password;
    delete teacherResponse._id;
    delete teacherResponse.__v;

    res.status(201).json({
      message: 'Compte enseignant créé avec succès.',
      teacher: teacherResponse
    });
  } catch (error) {
    next(error);
  }
};  

// Récupérer tous les professeurs
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({}, '-password').select('-__v'); // Exclure le champ mot de passe de la requête
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

// Récupérer un professeur par son ID
exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id, '-password -__v');
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant introuvable' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour les informations d'un professeur
exports.updateTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, teacherGroup, modules } = req.body;
    const updateFields = {
      firstName,
      lastName,
      email,
      password,
      teacherGroup,
    };

    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, updateFields, { new: true, select: '-password -__v' });

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Enseignant introuvable' });
    }

    res.status(200).json({ message: 'Enseignant mis à jour avec succès', teacher: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

// Supprimer un professeur
exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Enseignant introuvable' });
    }
    res.status(200).json({ message: 'Enseignant supprimé avec succès'});
  } catch (error) {
    next(error);
  }
};
