const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: false
  },
  size: {
    type: String,
    default: '0 KB'
  },
  folderCreationDate: {
    type: Date,
    default: Date.now
  },
  folderLastModification: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false
  }
});

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  folders: [folderSchema], // Incorporation du schéma du dossier dans le modèle de module
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false
  }
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
