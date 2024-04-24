const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route pour créer un nouvel étudiant
router.post('/students', studentController.createStudent);

module.exports = router;
