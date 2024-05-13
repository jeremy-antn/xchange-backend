const validatePassword = require('../utils/passwordUtils');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

function validateUserInput(req, res, next) {
  const { firstName, lastName, email, password, teacherGroup } = req.body;
  
  // Check if required fields are present for both student and teacher
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Check password strength
  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters long, contain at least one letter, one number, and one special character" });
  }

  // Additional validation specific to teachers
  if (req.url.includes('/teachers')) {
    if (!teacherGroup) {
      return res.status(400).json({ error: "Missing teacher group" });
    }
    // Add any additional teacher-specific validation here
  }
  
  // Move to the next middleware or route handler
  next();
}

// Functional middleware to check if moduleName is unique for the specified role
const checkUniqueModuleName = (role) => async (req, res, next) => {
  try {
    const { userId } = req.query; // Extract userId from query params
    const { moduleName } = req.body;

    // Find the user by ID based on the role
    let User;
    if (role === 'teacher') {
      User = Teacher;
    } else if (role === 'student') {
      User = Student;
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if any module with the same name exists for the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
    }

    const existingModule = user.modules.find(module => module.moduleName === moduleName);
    if (existingModule) {
      // For teacher, if module already exists, return error
      if (role === 'teacher') {
        return res.status(400).json({ message: 'Module name must be unique for the user' });
      }
      // For student, if module already exists, proceed to next middleware/controller
      else {
        return next();
      }
    }

    // If moduleName is unique, proceed to the next middleware or controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {validateUserInput, checkUniqueModuleName};
