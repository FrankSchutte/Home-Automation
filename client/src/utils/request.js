import superagent from 'superagent';

const url = 'http://192.168.0.51:3000';

const request = {
    fetchDevice: (id, callback) => {
        superagent
            .get(url + '/api/v1/devices/' + id)
            .end((err, res) => {
                const device = JSON.parse(res.text).device;

                callback(err, device);
            });
    },
    fetchDevices: (callback) => {
        superagent
            .get(url + '/api/v1/devices')
            .end((err, res) => {
                const devices = JSON.parse(res.text).devices;

                callback(err, devices);
            });
    },
    saveDevice: (device, callback) => {
        superagent
            .post(url + '/api/v1/devices')
            .send(device)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                const message = JSON.parse(res.text);

                callback(err, message);
            });
    },
    toggleDevice: (command, callback) => {
        superagent
            .post(url + '/api/v1/command')
            .send(command)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                const message = JSON.parse(res.text);

                callback(err, message);
            });
    }
};

export default request;
