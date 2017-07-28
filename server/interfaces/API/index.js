const express = require('express');
const bodyparser = require('body-parser');

const db = require('../database/mongodb');
const arduino = require('../arduino');

const api = express.Router();

api.use(bodyparser.json());
api.use(bodyparser.urlencoded({extended: true}));

// Command to perform an action
api.post('/v1/performAction', function (req, res) {
    let action = req.body;

    const performAction = function () {
        arduino.performAction(action, function (message) {
            res.json(message);
        });
    };

    switch (action.type) {
        case 'SEND_COMMAND':
            db.getDevice(action._id, function (err, device) {
                const originalAction = action;

                action = {
                    type: originalAction.type,
                    protocol: device.protocol,
                    command: [
                        device.commands[0][originalAction.action]
                    ]
                };
                performAction();
            });
            break;
        default:
            performAction();
            break;
    }
});

// Get a list of available comports
api.get('/v1/comports', function (req, res) {
    arduino.getComports(function (err, comports) {
        const message = {
            err: err,
            comports: comports
        };

        res.json(message);
    });
});

// Get currently activated comport
api.get('/v1/comports/current', function (err, res) {
    arduino.getComport(function (err, comport) {
        const message = {
            err: err,
            comport: comport
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

api.get('/v1/devices/:id', function (req, res) {
    const id = req.params.id;

    db.getDevice(id, function (err, device) {
        const message = {
            err: err,
            device: device
        };

        res.json(message);
    });
});

// Add a device
api.post('/v1/devices', function (req, res) {
    const device = req.body;

    db.addDevice(device, function (err, success, id) {
        const message = {
            err: err,
            success: success,
            id: id
        };

        res.json(message);
    });
});

module.exports = api;
