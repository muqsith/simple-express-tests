const path = require('path'),
    express = require('express'),
    router = express.Router()
    ;

router.use('/:username/js', (req, res, next) => {
    let jsFilePath = path.resolve(__dirname, 'dr',
        'sites', req.params.username, 'js', ...req.originalUrl.split('/js/')[1].split('/'));
    res.set({'Content-Type': 'application/javascript'});
    res.sendFile(jsFilePath);
});

router.use('/:username/css', (req, res, next) => {
    let cssFilePath = path.resolve(__dirname, 'dr',
        'sites', req.params.username, 'css', ...req.originalUrl.split('/css/')[1].split('/'));
    res.set({'Content-Type': 'text/css'});
    res.sendFile(cssFilePath);
});

router.use('/:username', (req, res, next) => {
    let htmlFilePath = path.resolve(__dirname, 'dr', 'sites', req.params.username, 'index.html');
    res.set({'Content-Type': 'text/html'});
    res.sendFile(htmlFilePath);
});

module.exports = router;
