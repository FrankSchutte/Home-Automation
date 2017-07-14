const SerialPort = require('serialport');

let port;

const Arduino = {
    getComports: function (callback) {
        SerialPort.list(function (err, comports) {
            if (err) {
                console.error(err);
                return callback('Unable to fetch connected com devices');
            }

            callback(err, comports);
        });
    },
    learnCommand: function (protocol, callback) {
        if (port === undefined || !port.isOpen()) {
            return callback('Make sure to set the comport');
        }

        const action = {
            type: 'LEARN_COMMAND',
            protocol: protocol
        };

        port.write(JSON.stringify(action), function (err) {
            if (err) {
                console.error(err);
                return callback('Unable to write action to Arduino');
            }

            port.once('data', function (data) {
                const parsedData = JSON.parse(data);
                const err = parsedData.err;
                const command = parsedData.command;

                callback(err, command);
            });
        });
    },
    setComport: function (comName, callback) {
        initializePort(comName, callback);
    },
    toggleDevice: function (action, callback) {
        if (port === undefined || !port.isOpen()) {
            return callback('Make sure to set the comport');
        }

        action.type = 'SEND_COMMAND';
        port.write(JSON.stringify(action), function (err) {
            if (err) {
                console.error(err);
                return callback('Unable to write action to Arduino');
            }

            port.once('data', function (data) {
                const parsedData = JSON.parse(data);
                const err = parsedData.err;
                const success = parsedData.success;

                callback(err, success);
            });
        });

    }
};

const initializePort = function (comName, callback) {
    port = new SerialPort(comName, {
        parser: SerialPort.parsers.readline('\n')
    }, function (err) {
        if (err) {
            console.error(err);
            return callback('Unable to connect to com device');
        }

        console.log('Serial port connection established::\n', comName);
        callback(err, 'Serial port connection established');

        port.on('err', function (err) {
            console.error(err);
        });
    });
};

module.exports = Arduino;
