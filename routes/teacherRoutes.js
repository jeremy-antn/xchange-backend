const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const teacherModuleController = require('../controllers/teacherModuleController'); // Import teacher module controller
const teacherStudentModuleController = require('../controllers/teacherStudentModuleController');
const {validateUserInput, checkUniqueModuleName} = require('../middleware/userValidation'); // Import the teacher validation middleware
const teacherAuth = require('../middleware/teacherAuth');

// Route pour créer un nouveau professeur
router.post('/teachers', validateUserInput, teacherController.createTeacher);

// Route pour récupérer tous les professeurs
router.get('/teachers', teacherController.getTeachers);

// Route pour récupérer un professeur par son ID
router.get('/teachers/:id', teacherController.getTeacherById);

// Route pour mettre à jour les infos d'un professeur
router.put('/teachers/:id', validateUserInput, teacherController.updateTeacher);

// Route pour delete un étudiant
router.delete('/teachers/:id', teacherController.deleteTeacher);

// Route pour créer un nouveau module pour un professeur
router.post('/teachers/modules', checkUniqueModuleName('teacher'), teacherModuleController.createModulesForTeacher);

// Route pour récupérer tous les modules d'un professeur
router.get('/teachers/modules/:teacherId', teacherModuleController.getModulesForTeacher);

// Récupérer un module spécifique d'un professeur 1
router.get('/teachers/:teacherId/modules/:moduleId', teacherModuleController.getModuleForTeacher);

// Route pour mettre à jour les détails d'un module pour un professeur par son ID
router.put('/teachers/:teacherId/modules/:moduleId', teacherModuleController.updateModuleForTeacher);

// Route for creating a module for a student by a teacher
router.post('/teachers/:teacherId/:studentId/modules', teacherAuth,  teacherStudentModuleController.createModulesForStudent);

// Route pour supprimer un module pour un professeur par son ID
router.delete('/teachers/:teacherId/modules/:moduleId', teacherModuleController.deleteModuleForTeacher);

// Route pour récupérer les modules d'un étudiant
router.get('/teachers/:teacherId/students/:studentId/modules', teacherStudentModuleController.getModulesForStudent);

// Route to view a module for a student by a teacher
router.get('/teachers/:teacherId/students/:studentId/modules/:moduleId', teacherAuth, teacherStudentModuleController.getModuleForStudent);

// Route to update a module for a student by a teacher
router.put('/teachers/:teacherId/students/:studentId/modules/:moduleId', teacherAuth, teacherStudentModuleController.updateModuleForStudent);

// Route to delete a module for a student by a teacher
router.delete('/teachers/:teacherId/students/:studentId/modules/:moduleId', teacherAuth, teacherStudentModuleController.deleteModuleForStudent);


module.exports = router;
