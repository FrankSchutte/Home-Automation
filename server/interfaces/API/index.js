const express = require('express');
const bodyparser = require('body-parser');

const db = require('../database/mongodb');
const arduino = require('../arduino');

const api = express.Router();

api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: true}));

api.get('/v1/devices', function (req, res) {
    db.getDevices(function (devices) {
        res.json(devices);
    });
});

api.get('/v1/learnCode', function (req, res) {
    arduino.learnCode(function (code) {
        res.send(code);
    });
});

api.post('/v1/toggleDevice', function (req, res) {
    arduino.toggleDevice(req.body, function () {
        res.send('hello');
    });
});

module.exports = api;
