const SerialPort = require('serialport');

let port;

const Arduino = {
    getComports: function (callback) {
        SerialPort.list(function (err, comports) {
            if (err) {
                console.error(err);
                return callback({err: 'Unable to fetch connected com devices'});
            }

            callback(err, comports);
        });
    },
    setComport: function (comName, callback) {
        initializePort(comName, callback);
    },
    performAction: function (action, callback) {
        if (port === undefined || !port.isOpen()) {
            return callback({err: 'Make sure to set the comport'});
        }

        port.write(JSON.stringify(action), function (err) {
            if (err) {
                console.error(err);
                return callback({err: 'Unable to write action to Arduino'});
            }

            port.once('data', function (data) {
                callback(JSON.parse(data));
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
            return callback({err: 'Unable to connect to com device'});
        }

        console.log('Serial port connection established::\n', comName);
        callback(err, 'Serial port connection established');

        port.on('err', function (err) {
            console.error(err);
        });
    });
};

module.exports = Arduino;
