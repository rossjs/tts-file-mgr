const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

// const helmet = require('helmet');

const fileMgrRoute = require('./routes/file-mgr-route');
const { modsDirectory } = require('./config');

const PORT = process.env.PORT || 8080;

const app = express();

// data parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(compression());

app.use('/api/files', fileMgrRoute);

app.use('/mods', express.static(modsDirectory));

// ? to use when we need to be able to change the root mod directory
// app.use('/mods', (req, res, next) => express.static(getModsDirectory())(req, res, next));

app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));

app.listen(PORT, () => {
  console.log(`TTS File Mgr server listening on port ${PORT}`);
});
