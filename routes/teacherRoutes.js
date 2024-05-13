const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const {validateUserInput, checkUniqueModuleName} = require('../middleware/userValidation'); // Import the teacher validation middleware

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
router.post('/teachers/modules', checkUniqueModuleName('teacher'), teacherController.createModulesForTeacher);

// Route pour récupérer tous les modules d'un professeur
router.get('/teachers/modules/:teacherId', teacherController.getModulesForTeacher);

/* // GET - Récupérer un module spécifique d'un professeur
router.get('/teachers/modules/:moduleId', teacherController.getModuleForTeacher); */

/* // Route pour mettre à jour les détails d'un module pour un professeur par son ID
router.put('/teachers/modules/:teacherId/:moduleId', teacherController.updateModuleForTeacher); */


module.exports = router;
