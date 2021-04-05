const path = require('path');
const os = require('os');

const config = {
  // TODO: set based on OS in default location
  modsDirectory: path.resolve(os.homedir(), 'Desktop/test-files/tts_mods'),
};
module.exports = config;
