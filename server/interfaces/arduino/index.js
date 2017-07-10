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
    learnCode: function (protocol, callback) {
        const action = {
            type: 'LEARN_CODE',
            protocol: protocol
        };

        port.write(JSON.stringify(action), function (err) {
            if (err) {
                console.error(err);
                return callback('Unable to learn a new code');
            }

            port.once('data', function (data) {
                const code = JSON.parse(data);

                callback(err, code);
            });
        });
    },
    setComport: function (comName, callback) {
        initializePort(comName, callback);
    },
    toggleDevice: function (command, callback) {
        if (port === undefined || !port.isOpen()) {
            return callback('Make sure to set the comport');
        }

        command.type = 'SEND_CODE';

        port.write(JSON.stringify(command), function (err) {
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
