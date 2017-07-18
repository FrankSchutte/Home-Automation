const express = require('express');
const bodyparser = require('body-parser');

const mockApi = express.Router();

mockApi.use(bodyparser.json());
mockApi.use(bodyparser.urlencoded({extended: true}));

// Toggle a device with a given action
mockApi.post('/v1/command', function (req, res) {
    const message = {
        err: undefined,
        success: 'Mock device should be toggled'
    };

    res.json(message);
});

// Learn a new code
mockApi.get('/v1/command/learn', function (req, res) {
    const command = [{
        "transmitterAddress": 123456,
        "unit": 7
    }];

    const message = {
        err: undefined,
        command: command
    };

    res.json(message);
});

// Get a list of available comports
mockApi.get('/v1/comports', function (req, res) {
    const comports = {
        err: undefined,
        comports: [{
            "comName": "MOCK1",
            "manufacturer": "TEST Srl (www.arduino.org)",
            "pnpId": "USB\\VID_2A03&PID_0043\\5543733373735120E120",
            "locationId": "Port_#0002.Hub_#0003",
            "vendorId": "2A03",
            "productId": "0043"
        }]
    };

    const message = {
        err: undefined,
        comports: comports
    };

    res.json(message);
});

// Set a comport that should be used
mockApi.post('/v1/comports', function (req, res) {
    const message = {
        err: undefined,
        success: 'Mock serial port should be connected'
    };

    res.json(message);
});

// Get a list of all devices
mockApi.get('/v1/devices', function (req, res) {
    const message = {
        err: undefined,
        devices: devices
    };

    res.json(message);
});

mockApi.get('/v1/devices/:id', function (req, res) {
    const device = devices.find((device) => {
        if (device._id === req.params.id) {
            return device;
        }
    });

    const message = {
        err: undefined,
        device: device
    };

    res.json(message);
});

// Add a device
mockApi.post('/v1/devices', function (req, res) {
    const device = req.body;

    const message = {
        err: undefined,
        success: 'Device has been successfully added',
        _id: 123456
    };

    res.json(message);
});

const devices = [{
    _id: "11111",
    label: 'Device 1',
    location: 'Location 1',
    protocol: 'NEW_REMOTE',
    commands: [{
        'turnDeviceOn': {
            transmitterAddress: 456789,
            unit: 0,
            switchOn: true
        },
        'turnDeviceOff': {
            transmitterAddress: 456789,
            unit: 0,
            switchOn: false
        }
    }]
}, {
    _id: "222222",
    label: 'Device 2',
    location: 'Location 2',
    protocol: 'NEW_REMOTE',
    commands: [{
        'turnDeviceOn': {
            transmitterAddress: 789123,
            unit: 3,
            switchOn: true
        },
        'turnDeviceOff': {
            transmitterAddress: 789123,
            unit: 3,
            switchOn: false
        }
    }]
}];

module.exports = mockApi;
