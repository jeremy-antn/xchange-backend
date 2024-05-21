const Module = require('../models/moduleModel');

// Fonction utilitaire pour créer les dossiers par défaut
const createDefaultFolders = async (module) => {
  // Création du dossier "Théorie" par défaut
  const theoryFolder = {
    folderName: 'Théorie',
    creator: module.creator // Utilise l'ID du créateur du module
  };

  // Création du dossier "Exercice" par défaut
  const exerciseFolder = {
    folderName: 'Exercice',
    creator: module.creator // Utilise l'ID du créateur du module
  };

  // Ajout des dossiers par défaut au module
  module.folders.push(theoryFolder, exerciseFolder);

  // Sauvegarde du module avec les dossiers par défaut
  await module.save();
};

module.exports = {
  createDefaultFolders
};

// Fonction utilitaire pour mettre à jour un module
const updateModuleDetails = async (moduleId, moduleName, description) => {
    // Mettre à jour les détails du module et renvoyer le module mis à jour
    return await Module.findByIdAndUpdate(
      moduleId,
      { moduleName, description },
      { new: true } // Renvoie le module mis à jour
    );
  };
  
  module.exports = {
    createDefaultFolders,
    updateModuleDetails,
  };