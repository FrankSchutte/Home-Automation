const express = require('express');

const db = require('../database/mongodb');

const api = express.Router();

api.get('/v1/devices', function (req, res) {
    db.getDevices(function (devices) {
        res.json(devices);
    });
});

module.exports = api;
