const path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    PORT = 8224
    ;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.send(`Hello World`);
});

app.use('/html/:username/js', (req, res, next) => {
    let jsFilePath = path.resolve(__dirname, 'dr',
        'sites', req.params.username, 'js', ...req.originalUrl.split('/js/')[1].split('/'));
    res.set({'Content-Type': 'application/javascript'});
    res.sendFile(jsFilePath);
});

app.use('/html/:username/css', (req, res, next) => {
    let cssFilePath = path.resolve(__dirname, 'dr',
        'sites', req.params.username, 'css', ...req.originalUrl.split('/css/')[1].split('/'));
    res.set({'Content-Type': 'text/css'});
    res.sendFile(cssFilePath);
});

app.use('/html/:username', (req, res, next) => {
    let htmlFilePath = path.resolve(__dirname, 'dr', 'sites', req.params.username, 'index.html');
    res.set({'Content-Type': 'text/html'});
    res.sendFile(htmlFilePath);
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
