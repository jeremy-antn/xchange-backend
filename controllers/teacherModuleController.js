const Teacher = require('../models/teacherModel');
const teacherUtils = require('../utils/teacherUtils');

// Créer de nouveaux modules pour un professeur
exports.createModulesForTeacher = async (req, res, next) => {
  try {
    const { userId } = req.query; // Extraire l'ID de l'enseignant des paramètres de la requête
    const modulesData = req.body.modules; // Tableau de modules du corps de la requête

    // Utiliser la fonction utilitaire pour trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(userId);

    // Ajouter des modules à la liste de modules de l'enseignant
    const newModules = modulesData.map(({ moduleName, description }) => ({ moduleName, description }));
    teacher.modules.push(...newModules);
    await teacher.save();

    res.status(201).json({
      message: 'Modules créés avec succès',
      modules: newModules,
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les modules d'un enseignant
exports.getModulesForTeacher = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId; // Récupérer l'ID de l'enseignant depuis les paramètres de la requête

    // Utiliser la fonction utilitaire pour trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Récupérer uniquement les modules de l'enseignant
    const modules = teacher.modules.map(({ moduleName, description, _id }) => ({
      moduleName,
      description,
      _id
    }));

    // Construire la réponse avec les détails des modules uniquement
    const response = {
      modules: modules
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Récupérer un module spécifique d'un enseignant
exports.getModuleForTeacher = async (req, res, next) => {
  try {
    const { teacherId, moduleId } = req.params;

    // Utiliser la fonction utilitaire pour trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Trouver le module spécifique de l'enseignant
    const module = teacher.modules.find(m => m._id.toString() === moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Construire la réponse avec les détails du module trouvé
    const response = {
      module: module
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour les détails d'un module pour un enseignant
exports.updateModuleForTeacher = async (req, res, next) => {
  try {
    const { teacherId, moduleId } = req.params; // Récupérer les IDs de l'enseignant et du module depuis les paramètres de la requête
    const { moduleName, description } = req.body; // Récupérer les nouveaux détails du module depuis le corps de la requête

    // Utiliser la fonction utilitaire pour trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Vérifier si le module existe pour cet enseignant
    const moduleToUpdate = teacher.modules.find(module => module._id.toString() === moduleId);
    if (!moduleToUpdate) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Mettre à jour les détails du module
    moduleToUpdate.moduleName = moduleName;
    moduleToUpdate.description = description;

    // Enregistrer les modifications dans la base de données
    await teacher.save();

    // Construire la réponse avec les détails du module mis à jour
    const response = {
      message: 'Détails du module mis à jour avec succès',
      module: moduleToUpdate
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Supprimer un module d'un enseignant
exports.deleteModuleForTeacher = async (req, res, next) => {
  try {
    const { teacherId, moduleId } = req.params; // Récupérer les IDs de l'enseignant et du module depuis les paramètres de la requête

    // Utiliser la fonction utilitaire pour trouver l'enseignant par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Vérifier si le module existe pour cet enseignant
    const moduleIndex = teacher.modules.findIndex(module => module._id.toString() === moduleId);
    if (moduleIndex === -1) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Supprimer le module du tableau de modules de l'enseignant
    teacher.modules.splice(moduleIndex, 1);
    await teacher.save();

    res.status(200).json({ message: 'Module supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
