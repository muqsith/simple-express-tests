const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const express = require('express');
const multer = require('multer');

const upload = multer();

const app = express();

app.get('/', (req, res) => {
    res.send('<h4>Multer tests</h4>');
});

app.post('/', upload.single('data'), (req, res, next) => {
    // const writeStream = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'tmp', 'out.gz'));
    console.log(req.file);
    res.send('ok');
});

module.exports = app;
