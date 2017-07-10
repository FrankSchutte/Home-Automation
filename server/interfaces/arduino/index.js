const SerialPort = require('serialport');

const port = new SerialPort('COM3', {
    parser: SerialPort.parsers.readline('\n')
});

const Arduino = {
    learnCode: function (protocol, callback) {
        const action = {
            type: 'LEARN_CODE',
            protocol: protocol
        };

        port.write(JSON.stringify(action));
        port.once('data', function (data) {
            const err = undefined;
            const code = JSON.parse(data);

            callback(err, code);
        });
    },
    toggleDevice: function (command, callback) {
        command.type = 'SEND_CODE';

        port.write(JSON.stringify(command));
        port.once('data', function (data) {
            const parsedData = JSON.parse(data);
            const err = parsedData.err;
            const success = parsedData.success;

            callback(err, success);
        });
    }
};

module.exports = Arduino;
