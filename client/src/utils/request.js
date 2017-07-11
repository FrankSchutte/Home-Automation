import superagent from 'superagent';

const url = 'http://192.168.0.51:3000';

const request = {
    fetchDevices: (callback) => {
        superagent
            .get(url + '/api/v1/devices')
            .end((err, res) => {
                const devices = JSON.parse(res.text).devices;

                callback(err, devices);
            });
    },
    toggleDevice: (command, callback) => {
        superagent
            .post(url + '/api/v1/code')
            .send(command)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                const message = JSON.parse(res.text);

                callback(err, message);
            });
    }
};

export default request;
