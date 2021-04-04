const fs = require('fs').promises;
const { modsDirectory } = require('../config/index');

const File = {};

File.getAllFiles = async () => {
  const files = await fs.readdir(modsDirectory);
  return files;
};

module.exports = File;
