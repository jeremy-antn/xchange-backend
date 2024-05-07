const validatePassword = require('../utils/passwordUtils');

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

module.exports = validateUserInput;
