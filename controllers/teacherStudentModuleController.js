const studentUtils = require('../utils/studentUtils');
const teacherUtils = require('../utils/teacherUtils');

// Create a module for a student
exports.createModulesForStudent = async (req, res, next) => {
  try {
    const { teacherId, studentId } = req.params;
    const modules = req.body.modules; // Assuming modules is an array of module objects

    // Find the teacher by ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Find the student by ID
    const student = await studentUtils.findStudentById(studentId);

    // Add the new modules to the student's list of modules
    student.modules.push(...modules);

    // Save the changes
    await student.save();

    res.status(201).json({ message: 'Modules created successfully', modules });
  } catch (error) {
    console.error('Error creating modules:', error);
    next(error);
  }
};

// Get modules for a student
exports.getModulesForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    // Find the student by ID
    const student = await studentUtils.findStudentById(studentId);

    res.status(200).json({ modules: student.modules });
  } catch (error) {
    console.error('Error fetching modules:', error);
    next(error);
  }
};

// Get a module for a student by a teacher
exports.getModuleForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;

    // Find the student by ID
    const student = await studentUtils.findStudentById(studentId);

    // Find the module for the student
    const module = student.modules.find(module => module.id === moduleId);

    if (!module) {
      return res.status(404).json({ message: 'Module not found for the student' });
    }

    res.status(200).json({ module });
  } catch (error) {
    console.error('Error fetching module:', error);
    next(error);
  }
};

// Update a module for a student
exports.updateModuleForStudent = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;
    const updatedModules = req.body.modules; // Corrected to handle multiple modules

    // Find the teacher by ID (optional, depending on your requirements)
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Find the student by ID
    const student = await studentUtils.findStudentById(studentId);

    // Update each module
    updatedModules.forEach(async updatedModule => {
      // Check if the module exists for the student
      const moduleIndex = student.modules.findIndex(module => module.id === moduleId);
      if (moduleIndex === -1) {
        return res.status(404).json({ message: 'Module not found for the student' });
      }

      // Update the module
      student.modules[moduleIndex] = updatedModule;
    });

    // Save the changes
    await student.save();

    res.status(200).json({ message: 'Modules updated successfully', modules: updatedModules });
  } catch (error) {
    console.error('Error updating modules:', error);
    next(error);
  }
};

// Delete a module for a student by a teacher
exports.deleteModuleForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;

    // Find the student by ID
    const student = await studentUtils.findStudentById(studentId);

    // Check if the module exists for the student
    const moduleIndex = student.modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) {
      return res.status(404).json({ message: 'Module not found for the student' });
    }

    // Remove the module from the student's list of modules
    student.modules.splice(moduleIndex, 1);

    // Save the changes
    await student.save();

    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    next(error);
  }
};
