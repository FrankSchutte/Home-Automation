const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://192.168.0.51:27017/home_automation';

const mongodb = {
    addDevice: function (device, callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices').insertOne(device)
                .then(function ({result}) {
                    if (!result.ok) {
                        callback('Unable to add the device');
                    }

                    callback(err, 'Device has been successfully added');
                    db.close();
                });
        });
    },
    getDevice: function (id, callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices')
                .findOne({"_id": ObjectID(id)}, function (err, device) {
                    callback(err, device);
                    db.close();
                });
        });
    },
    getDevices: function (callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices')
                .find({})
                .toArray(function (err, devices) {
                    callback(err, devices);
                    db.close();
                });
        });
    }
};

module.exports = mongodb;
