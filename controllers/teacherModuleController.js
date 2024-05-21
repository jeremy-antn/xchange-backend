const Teacher = require('../models/teacherModel');
const Module = require('../models/moduleModel');
const teacherUtils = require('../utils/teacherUtils');
const moduleUtils = require('../utils/moduleUtils');

// Créer de nouveaux modules pour un professeur
exports.createModulesForTeacher = async (req, res, next) => {
  try {
    const { userId } = req.query;
    let modulesData = req.body.modules; // Supposons que les données des modules soient envoyées dans un tableau nommé 'modules'

    // Trouver le professeur par ID
    const teacher = await teacherUtils.findTeacherById(userId);

    // Si les données des modules ne sont pas envoyées sous forme de tableau, les convertir en tableau pour simplifier le traitement
    if (!Array.isArray(modulesData)) {
      modulesData = [modulesData];
    }

    // Créer une liste pour stocker les nouveaux modules créés
    const createdModules = [];

    // Parcourir chaque module dans les données reçues
    for (const moduleData of modulesData) {
      const { moduleName, description } = moduleData;

      // Créer un nouveau module
      const newModule = new Module({
        moduleName,
        description,
        creator: userId // Référencer l'enseignant créateur du module
      });

      // Ajouter les dossiers par défaut
      await moduleUtils.createDefaultFolders(newModule);

      // Sauvegarder le module
      await newModule.save();

      // Ajouter le module à la liste des modules créés
      createdModules.push(newModule);

      // Ajouter le module à la liste des modules de l'enseignant
      teacher.modules.push(newModule);
    }

    // Sauvegarder les modifications apportées à l'enseignant
    await teacher.save();

    res.status(201).json({ message: 'Modules créés avec succès', modules: createdModules });
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les modules d'un enseignant
exports.getModulesForTeacher = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId; // Récupérer l'ID de l'enseignant depuis les paramètres de la requête

    // Utiliser la méthode populate directement sur la recherche de l'enseignant
    const teacher = await Teacher.findById(teacherId)
      .populate('modules', '-_id moduleName description'); // Peupler les références aux modules et sélectionner les champs

    // Récupérer les modules à partir de l'enseignant
    const modules = teacher.modules;

    res.status(200).json(modules);
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

    // Vérifier si le module existe pour cet enseignant
    if (!teacher.modules.includes(moduleId)) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Récupérer les détails complets du module
    const module = await Module.findById(moduleId).select('-_id moduleName description folders');

    res.status(200).json(module);
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
    if (!teacher.modules.includes(moduleId)) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Mettre à jour les détails du module
    const updatedModule = await moduleUtils.updateModuleDetails(moduleId, moduleName, description);

    res.status(200).json({ message: 'Détails du module mis à jour avec succès', module: updatedModule });
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
    if (!teacher.modules.includes(moduleId)) {
      return res.status(404).json({ message: 'Module introuvable pour cet enseignant' });
    }

    // Supprimer le module du tableau de modules de l'enseignant
    teacher.modules.pull(moduleId);
    await teacher.save();

    // Supprimer le module de la base de données
    await Module.findByIdAndDelete(moduleId);

    res.status(200).json({ message: 'Module supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
