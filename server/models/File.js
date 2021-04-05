const fs = require('fs').promises;
const path = require('path');

const { modsDirectory } = require('../config/index');

const File = {};

File.getAllFiles = async () => {
  const files = await fs.readdir(modsDirectory);
  return files;
};

File.moveFiles = async ({ ids, folder }) => {
  const queue = [];
  ids.forEach((id) => {
    const oldJsonPath = path.resolve(modsDirectory, `${id}.json`);
    const newJsonPath = path.resolve(modsDirectory, folder, `${id}.json`);
    queue.push(fs.rename(oldJsonPath, newJsonPath));
    const oldPngPath = path.resolve(modsDirectory, `${id}.png`);
    const newPngPath = path.resolve(modsDirectory, folder, `${id}.png`);
    queue.push(fs.rename(oldPngPath, newPngPath));
  });
  await Promise.all(queue);
};

module.exports = File;
