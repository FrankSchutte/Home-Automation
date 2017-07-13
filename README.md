# Software guidebook home-automation
Project to create a central system, usable with smartphone, to control 433 mhz outlet sockets.
## Installation
```
git clone https://github.com/FrankSchutte/home-automation.git
npm start
```
Then open [http://localhost:3000](http://localhost:3000) to see the website.
## Routes
### /
Index page displaying Hello World!
## Database
### Mongodb
## Interfaces
### API
#### Toggle a device
POST /api/v1/code
```
Request body:
{
    protocol: String [ NEW_REMOTE ],
    commands: [{
        ...
    }]
}
Response body:
{
    err: undefined || String,
    success: String
}
```
#### Learn a new code
GET /api/v1/code/learn
```
Query params:
    protocol: String [ NEW_REMOTE ]
Response body:
{
    err: undefined || String,
    commands: [{
        ...
    }]
}
```
#### Get a list of comports
GET /api/v1/comports
```
Response body:
{
    err: undefined || String,
    comports: [{
        comName: String,
        manufacturer: String,
        pnpId: String,
        locationId: String,
        vendorId: String
        productId: String
    }, {
        ...
    }]
}
```
#### Set a comport
POST /api/v1/comports
```
Request body:
{
    comName: String
}
Response body:
{
    err: undefined || String,
    success: String
}
```
#### Get a list of devices
GET /api/v1/devices
```
Response body:
{
    err: undefined || String,
    devices: [{
        _id: String,
        label: String,
        location: String,
        protocol: String,
        commands: [{
            ...
        }]
    }, {
        ...
    }]
}
```
#### Get a device based on id
GET /api/v1/devices/:id
```
Query params:
    id: String
Response body:
{
    err: undefined || String,
    device: {
        _id: String,
        label: String,
        location: String,
        protocol: String,
        commands: [{
            ...
        }]
    }
}
```
#### Add a device
POST /api/v1/devices
```
Request body:
{
    label: String,
    location: String,
    protocol: String,
    commands: [{
        ...
    }]
}
Response body:
{
    err: undefined || String,
    success: String,
    id: String
}
```
### Arduino
#### Learn code
```
Send to serial port:
{
    type: 'LEARN_CODE',
    protocol: 'NEW_REMOTE'
}
Received from serial port: 
    err: undefined || String
    commands: [{
        address: Number,
        unit: Number
    }]
```
#### Toggle devices
```
Send to serial port:
{
    type: 'SEND_CODE',
    protocol: 'NEW_REMOTE',
    commands: [{
        transmitterAddress: Number,
        unit: Number,
        switchOn: Boolean
    }]
}
Received from serial port:
    err: undefined || String
    success: String
```
### Web socket
## Raspberry Pi Configuration
To setup the raspberry pi use the following commands:
[Connect to WiFi](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf  

// Add the network, example:
network={
    ssid="testing"
    psk="testingPassword"
    id_str="home"
}

sudo wpa_cli reconfigure
```
[Setup ssh](https://www.raspberrypi.org/documentation/remote-access/ssh/)
```
sudo raspi-config

// Add to files:
//  /etc/ssh/ssh_config
//  /etc/ssh/sshd_config
// the line:
IPQoS 0x00

sudo service sshd restart
```
[Setup node & npm](http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/#install-node)

[Setup MongoDB](http://yannickloriot.com/2016/04/install-mongodb-and-node-js-on-a-raspberry-pi/) and 
[with remote host](http://aeonmedia.eu/2011/04/mongodb-setup-config-to-connect-by-remote-hosts-debian/)
```
sudo nano /etc/mongodb.conf

// Update bind_ip
bind_ip = 0.0.0.0

sudo service mongodb restart
```
