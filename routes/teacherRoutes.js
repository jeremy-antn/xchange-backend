const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const validateUserInput = require('../middleware/userValidation'); // Import the teacher validation middleware

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

module.exports = router;
