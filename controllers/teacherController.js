const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherModel');
const teacherUtils = require('../utils/teacherUtils');

// Créer un nouveau professeur
exports.createTeacher = async (req, res, next) => {
    try {
      const { firstName, lastName, email, teacherGroup, password } = req.body;
  
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newTeacher = new Teacher({
        firstName,
        lastName,
        email,
        teacherGroup,
        password: hashedPassword,
      });
  
      await newTeacher.save();
  
      const teacherResponse = newTeacher.toObject();
      delete teacherResponse.password;
      delete teacherResponse._id;
      delete teacherResponse.__v;
  
      res.status(201).json({
        message: 'Teacher account created successfully.',
        teacher: teacherResponse
      });
    } catch (error) {
      next(error);
    }
  };  

// Récupérer tous les professeurs
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({}, '-password').select('-__v'); // Exclude password field from the query
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

// Récupérer un professeur par son ID
exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id, '-password -__v');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour les infos d'un professeur
exports.updateTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, teacherGroup, modules } = req.body;
    const updateFields = {
      firstName,
      lastName,
      email,
      password,
      teacherGroup,
    };

    const updateTeacher = await Teacher.findByIdAndUpdate(req.params.id, updateFields, { new: true, select: '-password -__v' });

    if (!updateTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher updated successfully', teacher: updateTeacher });
  } catch (error) {
    next(error);
  }
};


// Supprimer un professeur
exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully'});
  } catch (error) {
    next(error);
  }
};

// Créer de nouveaux modules pour un professeur
exports.createModulesForTeacher = async (req, res, next) => {
  try {
    const { userId } = req.query; // Extract teacherId from query params
    const modulesData = req.body.modules; // Array of modules from request body

    // Utiliser la fonction utilitaire pour trouver le professeur par ID
    const teacher = await teacherUtils.findTeacherById(userId);

    // Ajouter des modules au tableau de modules du professeur
    const newModules = modulesData.map(({ moduleName, description }) => ({ moduleName, description }));
    teacher.modules.push(...newModules);
    await teacher.save();

    res.status(201).json({
      message: 'Modules created successfully',
      modules: newModules,
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les modules d'un professeur
exports.getModulesForTeacher = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId; // Récupérer l'ID du professeur depuis les paramètres de la requête

    // Utiliser la fonction utilitaire pour trouver le professeur par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Récupérer uniquement les modules du professeur
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

// Récupérer un module spécifique d'un professeur 1
exports.getModuleForTeacher = async (req, res, next) => {
  try {
    const { teacherId, moduleId } = req.params;

    // Utiliser la fonction utilitaire pour trouver le professeur par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Trouver le module spécifique du professeur
    const module = teacher.modules.find(m => m._id.toString() === moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found for this teacher' });
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

// Mettre à jour les détails d'un module pour un professeur
exports.updateModuleForTeacher = async (req, res, next) => {
  try {
    const { teacherId, moduleId } = req.params; // Récupérer les IDs du professeur et du module depuis les paramètres de la requête
    const { moduleName, description } = req.body; // Récupérer les nouveaux détails du module depuis le corps de la requête

    // Utiliser la fonction utilitaire pour trouver le professeur par ID
    const teacher = await teacherUtils.findTeacherById(teacherId);

    // Vérifier si le module existe pour ce professeur
    const moduleToUpdate = teacher.modules.find(module => module._id.toString() === moduleId);
    if (!moduleToUpdate) {
      return res.status(404).json({ message: 'Module not found for this teacher' });
    }

    // Mettre à jour les détails du module
    moduleToUpdate.moduleName = moduleName;
    moduleToUpdate.description = description;

    // Enregistrer les modifications dans la base de données
    await teacher.save();

    // Construire la réponse avec les détails du module mis à jour
    const response = {
      message: 'Module details updated successfully',
      module: moduleToUpdate
      };

      res.status(200).json(response);
      } catch (error) {
        next(error);
      }
};