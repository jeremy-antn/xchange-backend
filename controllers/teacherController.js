const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherModel');

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
        message: 'Teacher account created successfully.',
        teacher: teacherResponse
      });
    } catch (error) {
      next(error);
    }
  };  

// Récupérer tous les professeurs
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({}, '-password').select('-__v'); // Exclude password field from the query
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
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour les infos d'un professeur
exports.updateTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, teacherGroup, modules } = req.body;
    const updateTeacher = await Teacher.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      password,
      teacherGroup,
      modules
    }, { new: true, select: '-password -__v' });
    if (!updateTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher updated successfully', teacher: updateTeacher });
  } catch (error) {
    next(error);
  }
};

// Supprimer un professeur
exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully'});
  } catch (error) {
    next(error);
  }
};