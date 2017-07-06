# Software guidebook home-automation
Home project to create a central system, usable with smartphone, to control 433 mhz outlet sockets.
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
## Interfaces
### API
### Web socket
## Raspberry Pi Configuration
To setup the raspberry pi use the following commands:
[Connect to WiFi](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
```
// Open WiFi config file:
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf  

// Add the network, example:
network={
    ssid="testing"
    psk="testingPassword"
    id_str="home"
}

// Reconfigure
sudo wpa_cli reconfigure
```
[Setup ssh](https://www.raspberrypi.org/documentation/remote-access/ssh/)
```
// Open raspi config dialog
sudo raspi-config

// To prevent ssh freezes add to files:
    /etc/ssh/ssh_config
    /etc/ssh/sshd_config 
// the line:
IPQoS 0x00

// Then run command
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
