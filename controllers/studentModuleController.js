const bcrypt = require('bcrypt');
const Student = require('../models/studentModel');
const studentUtils = require('../utils/studentUtils');

// Récupérer tous les modules d'un étudiant
exports.getStudentModules = async (req, res, next) => {
    try {
      const studentId = req.params.id;
  
      // Utilisation de l'utilitaire pour trouver l'étudiant par ID
      const student = await studentUtils.findStudentById(studentId);
  
      // Récupérer les modules de l'étudiant
      const modules = student.modules;
  
      res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  };
  
  // Récupérer un module spécifique d'un étudiant
  exports.getStudentModule = async (req, res, next) => {
    try {
      const studentId = req.params.studentId;
      const moduleId = req.params.moduleId;
  
      // Utilisation de l'utilitaire pour trouver l'étudiant par ID
      const student = await studentUtils.findStudentById(studentId);
  
      // Récupérer le module spécifique de l'étudiant
      const module = student.modules.id(moduleId);
      if (!module) {
        return res.status(404).json({ message: 'Module not found for this student' });
      }
  
      res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  };
  