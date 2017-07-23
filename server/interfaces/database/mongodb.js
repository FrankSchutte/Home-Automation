const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://192.168.0.51:27017/home_automation';

const mongodb = {
    addDevice: function (device, callback) {
        MongoClient.connect(url, function (err, db) {
            if (db === null) {
                return callback('We don\'t have a connection with the DB');
            }

            db.collection('devices').insertOne(device)
                .then(function ({result, ops}) {
                    if (!result.ok) {
                        callback('Unable to add the device');
                    }

                    callback(err, 'Device has been successfully added', ops[0]._id);
                    db.close();
                });
        });
    },
    getDevice: function (id, callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices')
                .findOne({"_id": ObjectID(id)})
                .then(function (device) {
                    callback(undefined, device);
                    db.close();
                })
                .catch(function (err) {
                    callback(err);
                    db.close();
                });
        });
    },
    getDevices: function (callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices')
                .find({}, {_id: 1, label: 1, location: 1})
                .toArray()
                .then(function (devices) {
                    callback(undefined, devices);
                    db.close();
                })
                .catch(function (err) {
                    callback(err);
                    db.close();
                });
        });
    }
};

module.exports = mongodb;
