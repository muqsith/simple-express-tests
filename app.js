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

app.use('/arif', express.static(path.resolve(__dirname, 'dr', 'sites', 'arif')));

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
