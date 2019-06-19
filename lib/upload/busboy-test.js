const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');
const zlib = require('zlib');
const express = require('express');
const Busboy = require('busboy');

const app = express();

app.get('/', (req, res) => {
    res.send('<h4>Busboy tests</h4>');
});

app.post('/', (req, res, next) => {
    const writeStream = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'tmp', 'out.gz'));
    // const writeStream = new PassThrough();
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log('\nfieldname: ', fieldname, '\nfile: ', file, '\nfilename: ', filename, '\nencoding: ', encoding, '\nmimetype: ', mimetype);
        file.pipe(writeStream);
    });
    busboy.on('field', (fieldname, val) => {
        // console.log(fieldname, val);
    });
    busboy.on('finish', () => {
        res.end('ok');
    });
    busboy.on('error', (err) => {
        console.log(err);
    });
    req.pipe(busboy);

});

module.exports = app;
