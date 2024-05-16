const studentUtils = require('../utils/studentUtils');
const teacherUtils = require('../utils/teacherUtils');

// Créer un module pour un étudiant
exports.createModulesForStudent = async (req, res, next) => {
  try {
    const { teacherId, studentId } = req.params;
    const modules = req.body.modules; // Supposant que modules est un tableau d'objets de module

    // Trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Trouver l'étudiant par ID
    const student = await studentUtils.findStudentById(studentId);

    // Ajouter les nouveaux modules à la liste des modules de l'étudiant
    student.modules.push(...modules);

    // Enregistrer les modifications
    await student.save();

    res.status(201).json({ message: 'Modules créés avec succès', modules });
  } catch (error) {
    console.error('Erreur lors de la création des modules :', error);
    next(error);
  }
};

// Obtenir les modules pour un étudiant
exports.getModulesForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    // Trouver l'étudiant par ID
    const student = await studentUtils.findStudentById(studentId);

    res.status(200).json({ modules: student.modules });
  } catch (error) {
    console.error('Erreur lors de la récupération des modules :', error);
    next(error);
  }
};

// Obtenir un module pour un étudiant par un enseignant
exports.getModuleForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;

    // Trouver l'étudiant par ID
    const student = await studentUtils.findStudentById(studentId);

    // Trouver le module pour l'étudiant
    const module = student.modules.find(module => module.id === moduleId);

    if (!module) {
      return res.status(404).json({ message: 'Module non trouvé pour l\'étudiant' });
    }

    res.status(200).json({ module });
  } catch (error) {
    console.error('Erreur lors de la récupération du module :', error);
    next(error);
  }
};

// Mettre à jour un module pour un étudiant
exports.updateModuleForStudent = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;
    const updatedModules = req.body.modules; // Corrigé pour gérer plusieurs modules

    // Trouver l'enseignant par ID (facultatif, selon vos besoins)
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Trouver l'étudiant par ID
    const student = await studentUtils.findStudentById(studentId);

    // Mettre à jour chaque module
    updatedModules.forEach(async updatedModule => {
      // Vérifier si le module existe pour l'étudiant
      const moduleIndex = student.modules.findIndex(module => module.id === moduleId);
      if (moduleIndex === -1) {
        return res.status(404).json({ message: 'Module non trouvé pour l\'étudiant' });
      }

      // Mettre à jour le module
      student.modules[moduleIndex] = updatedModule;
    });

    // Enregistrer les modifications
    await student.save();

    res.status(200).json({ message: 'Modules mis à jour avec succès', modules: updatedModules });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des modules :', error);
    next(error);
  }
};

// Supprimer un module pour un étudiant par un enseignant
exports.deleteModuleForStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const moduleId = req.params.moduleId;

    // Trouver l'étudiant par ID
    const student = await studentUtils.findStudentById(studentId);

    // Vérifier si le module existe pour l'étudiant
    const moduleIndex = student.modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) {
      return res.status(404).json({ message: 'Module non trouvé pour l\'étudiant' });
    }

    // Supprimer le module de la liste des modules de l'étudiant
    student.modules.splice(moduleIndex, 1);

    // Enregistrer les modifications
    await student.save();

    res.status(200).json({ message: 'Module supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du module :', error);
    next(error);
  }
};
