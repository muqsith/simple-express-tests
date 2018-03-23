const path = require('path'),
    express = require('express'),
    router = express.Router(),
    chromeImageGenerator = require('./lib/chrome-image-generator'),
    upload = require('multer')()
    ;

router.post('/', upload.array(), (req, res, next) => {
    let data_str = req.body.data;
    if (data_str) {
        let data = JSON.parse(data_str);
        return chromeImageGenerator(data)
        .then(() => {
            res.json({status: 'ok'});
        })
        .catch((err) => {
            next(err);
        });
    } else {
        next(new Error('URL and selector are missing'));
    }
    
});


module.exports = router;
