const express = require('express');

const api = require('./interfaces/API/index');

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    console.log('Incoming request::\n', req.path);
    next();
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', api);

app.get('/*', function (req, res) {
    const response = {
        success: 'Hello World!'
    };

    res.json(response);
});

app.listen(port, function () {
    console.log('Server started::\n', port);
});
