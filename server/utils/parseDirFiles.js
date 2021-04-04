const fs = require('fs').promises;
const path = require('path');
const { modsDirectory } = require('../config/index');

function parseNames(dirPaths, basePath = '') {
  const folders = new Set();
  const mods = new Set();
  dirPaths.forEach((filename) => {
    let id;
    if (filename.endsWith('.png')) {
      id = filename.substring(0, filename.length - 4);
    } else if (filename.endsWith('.json')) {
      id = filename.substring(0, filename.length - 5);
      // skip TTS config file
      if (id === 'WorkshopFileInfos') return;
    }
    // if ID has been set
    if (id) return mods.add(id);
    folders.add(filename);
  });
  return { folders: Array.from(folders), mods };
}

async function getModDetails(id, basePath) {
  const modPath = path.resolve(modsDirectory, basePath, `${id}.json`);
  const data = await fs.readFile(modPath);
  const { SaveName: name } = JSON.parse(data);
  return { id, name, pngUrl: path.resolve(modsDirectory, basePath, `${id}.json`) };
}

async function getAllModDetails(modSet, basePath) {
  const output = [];
  let queue = [];
  const mods = Array.from(modSet);
  for (let i = 0; i < mods.length; i += 1) {
    const mod = mods[i];
    queue.push(getModDetails(mod, basePath));
    // only request max of 20 files at a time
    // if (queue.length > 20 || i === mods.length - 1) {
    //   const details = await Promise.all(queue);
    //   output.push(...details);
    //   queue = [];
    // }
  }
  const details = await Promise.all(queue);
  output.push(...details);
  return output;
}

module.exports = async function parseDirFiles(dirPaths, basePath = '') {
  const parsed = parseNames(dirPaths);
  console.log('parsed', parsed);
  const mods = await getAllModDetails(parsed.mods, basePath);
  return { ...parsed, mods };
};
