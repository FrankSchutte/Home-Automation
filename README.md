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
    action: {
        ...
    }
}
Response body:
{
    err: undefined || String,
    success: undefined || String
}
```
#### Learn a new code
GET /api/v1/code/learn
```
Request body:
{
    protocol: String [ NEW_REMOTE ]
}
Response body:
{
    err: undefined || String,
    code: {
        transmitterAddress: Number,
        unit: Number
    }
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
        actions: {
            ...
        }
    }, {
        ...
    }]
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
err: String
code: {
        address: Number,
        unit: Number
    }
```
#### Toggle devices
```
Send to serial port:
{
    type: 'SEND_CODE',
    protocol: 'NEW_REMOTE',
    action: {
        transmitterAddress: Number,
        unit: Number,
        switchOn: Boolean
    }
}
Received from serial port:
err: String
success: undefined || String
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
[Setup node & npm](http://yannickloriot.com/2016/04/install-mongodb-and-node-js-on-a-raspberry-pi/)

[Setup MongoDB with remote host](http://aeonmedia.eu/2011/04/mongodb-setup-config-to-connect-by-remote-hosts-debian/)
```
sudo nano /etc/mongodb.conf

// Update bind_ip
bind_ip = 0.0.0.0

sudo service mongodb restart
```
