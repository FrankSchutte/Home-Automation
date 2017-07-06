const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://192.168.0.51:27017/home_automation';

const mongodb = {
    getDevices: function(callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices').find({}).toArray(function (err, devices) {
                callback(devices);
                db.close();
            });
        });
    }
};

module.exports = mongodb;
