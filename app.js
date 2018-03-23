const path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    PORT = 8224
    ;

const dummyHtmlRouter = require('./dummy-html-middleware'),
    chromeImageGenerationRouter = require('./chrome-generator-middleware');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.send(`Hello World`);
});

app.use('/html', dummyHtmlRouter);

app.use('/generate-image', chromeImageGenerationRouter);


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
