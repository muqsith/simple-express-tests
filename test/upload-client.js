const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const request = require('request');


function uploadFile() {

    // const url = 'http://localhost:8224/upload/multer';
    const url = 'http://localhost:8224/upload/busboy';

    const filePath = path.resolve(__dirname, '..', 'tmp', 'summary.gz');
    const formData = {
        'app-secret': '1233453',
        instruction: 'delete',
        'collection-name': 'shops',
        // 'data': fs.createReadStream(filePath).pipe(zlib.createGzip())
        custom_file: {
            value: fs.createReadStream(filePath), //.pipe(zlib.createGzip()),
            options: {
                filename: 'data'
            }
        }
    };

    request.post({ url, formData, agentOptions: { rejectUnauthorized: false } }, (err, httpResponse, body) => {
        if (err) {
            console.error(err);
        } else if (200 !== +httpResponse.statusCode) {
            console.error(`Recieved ${httpResponse.statusCode} response status code from server`);
        } else {
            console.log(`Response status code: ${httpResponse.statusCode}`);
        }
    });
}

uploadFile();

/**
 *
 * const outGzStream = fs.createWriteStream(outGzFile);
outGzStream.on('finish', () => {
    fs.createReadStream(outGzFile).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(outJsonFile));
})
fs.createReadStream(inJsonFile).pipe(zlib.createGzip()).pipe(outGzStream);

 *
 */
