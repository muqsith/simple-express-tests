const express = require('express');

const multertest = require('./multer-test');
const busboytest = require('./busboy-test');

const app = express();

app.use('/multer', multertest);
app.use('/busboy', busboytest);

module.exports = app;
