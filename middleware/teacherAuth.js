const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

const teacherAuthorizationMiddleware = async (req, res, next) => {
  try {
    const { teacherId, studentId } = req.params;

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    // Find the student by ID (optional, depending on your requirements)
    // const student = await Student.findById(studentId);

    // Check if the teacher exists and if the teacher is authorized
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // You can also check if the student exists and handle accordingly
    // if (!student) {
    //   return res.status(404).json({ message: 'Student not found' });
    // }

    // If authorized, proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = teacherAuthorizationMiddleware;

