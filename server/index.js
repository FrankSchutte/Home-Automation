const express = require('express');
const path = require('path');

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

app.use('/static', express.static(path.join(__dirname, '..', 'client', 'build', 'static')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(port, function () {
    console.log('Server started::\n', port);
});
