const path = require('path');
const os = require('os');

const config = {
  modsDirectory: path.resolve(os.homedir(), 'Desktop/test-files/tts_mods'),
};
module.exports = config;
