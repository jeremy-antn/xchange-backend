const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studentModuleController = require('../controllers/studentModuleController');
const { validateUserInput } = require('../middleware/userValidation'); // Import the student validation middleware

// Route pour créer un nouvel étudiant
router.post('/students', validateUserInput, studentController.createStudent);

// Route pour récupérer tous les étudiants
router.get('/students', studentController.getStudents);

// Route pour récupérer un étudiant par son ID
router.get('/students/:id', studentController.getStudentById);

// Route pour mettre à jour les infos d'un étudiant
router.put('/students/:id', validateUserInput, studentController.updateStudent);

// Route pour delete un étudiant
router.delete('/students/:id', studentController.deleteStudent);

// Route pour récupérer tous les modules d'un étudiant
router.get('/students/:id/modules', studentModuleController.getStudentModules);

// Route pour récupérer un module spécifique d'un étudiant
router.get('/students/:studentId/modules/:moduleId', studentModuleController.getStudentModule);

module.exports = router;
