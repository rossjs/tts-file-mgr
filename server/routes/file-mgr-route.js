const router = require('co-router')();
const File = require('../models/File');
const parseDirFiles = require('../utils/parseDirFiles');

router.get('/', async (req, res) => {
  const data = await File.getAllFiles();
  const newData = await parseDirFiles(data);
  res.json(newData);
});

router.post('/', async (req, res) => {
  const { ids, folder } = req.body;
  const data = await File.moveFiles({ ids, folder });
  res.sendStatus(200);
  // const newData = await parseDirFiles(data);
  // res.json(newData);
});

module.exports = router;
