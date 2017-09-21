import superagent from 'superagent';

const url = 'http://' + window.location.host;

const request = {
    fetchComports: (callback) => {
        superagent
            .get(url + '/api/v1/comports')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const comports = parsedRes.comports;

                callback(errMessage, comports);
            });
    },
    fetchCurrentComport: (callback) => {
        superagent
            .get(url + '/api/v1/comports/current')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const comport = parsedRes.comport;

                callback(errMessage, comport);
            });
    },
    fetchDevices: (callback) => {
        superagent
            .get(url + '/api/v1/devices')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const devices = parsedRes.devices;

                callback(errMessage, devices);
            });
    },
    setComport: (comName, callback) => {
        superagent
            .post(url + '/api/v1/comports')
            .send({comName: comName})
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const success = parsedRes.success;

                callback(errMessage, success);
            });
    },
    toggleDevice: (command, callback) => {
        superagent
            .post(url + '/api/v1/performAction')
            .send(command)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const success = parsedRes.success;

                callback(errMessage, success);
            });
    }
};

export default request;
