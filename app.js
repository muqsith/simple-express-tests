const path = require('path');

const upload = require('./lib/upload');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8224;

const dummyHtmlRouter = require('./dummy-html-middleware'),
    chromeImageGenerationRouter = require('./chrome-generator-middleware');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.send(`Hello World`);
});

app.use('/html', dummyHtmlRouter);

app.use('/generate-image', chromeImageGenerationRouter);

app.use('/upload', upload);


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
