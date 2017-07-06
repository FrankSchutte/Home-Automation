const SerialPort = require('serialport');

const port = new SerialPort('COM3', {
    parser: SerialPort.parsers.readline('\n')
});

const Arduino = {
    learnCode: function (callback) {
        port.write(JSON.stringify({type: 'LEARN_NEW_REMOTE'}));

        port.once('data', function (data) {
            callback(data);
        });
    },
    toggleDevice: function (action, callback) {
        port.write(JSON.stringify(action));
        callback();
    }
};

module.exports = Arduino;
