const router = require('co-router')();
const File = require('../models/File');
const parseDirFiles = require('../utils/parseDirFiles');

router.get('/', async (req, res) => {
  const data = await File.getAllFiles();
  const newData = await parseDirFiles(data);
  res.json(newData);
});

module.exports = router;
