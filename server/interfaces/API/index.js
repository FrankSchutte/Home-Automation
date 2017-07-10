const express = require('express');
const bodyparser = require('body-parser');

const db = require('../database/mongodb');
const arduino = require('../arduino');

const api = express.Router();

api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: true}));

// Toggle a device with a given action
api.post('/v1/code', function (req, res) {
    const command = req.body;

    arduino.toggleDevice(command, function (err, success) {
        const message = {
            err: err,
            success: success
        };

        res.json(message);
    });
});

// Learn a new code
api.get('/v1/code/learn', function (req, res) {
    const protocol = req.query.protocol;

    if (protocol === undefined) {
        return res.json({err: 'Please supply the protocol you want to listen to, options are [ \' NEW_REMOTE\' ]'});
    }

    arduino.learnCode(protocol, function (err, code) {
        const message = {
            err: err,
            code: code
        };

        res.json(message);
    });
});

// Get a list of all available comports
api.get('/v1/comports', function (req, res) {
    arduino.getComports(function (err, comports) {
        const message = {
            err: err,
            comports: comports
        };

        res.json(message);
    });
});

// Set a comport that should be used
api.post('/v1/comports', function (req, res) {
    const comName = req.body.comName;

    arduino.setComport(comName, function (err, success) {
        const message = {
            err: err,
            success: success
        };

        res.json(message);
    });
});

// Get a list of all devices
api.get('/v1/devices', function (req, res) {
    db.getDevices(function (err, devices) {
        const message = {
            err: err,
            devices: devices
        };

        res.json(message);
    });
});

module.exports = api;
