/*
   RF controller to control my home outlets.

   Make sure to connect the receiver to digital pin 2, and the transmitter to digital pin 11.
*/

#include <ArduinoJson.h>
#include <NewRemoteReceiver.h>
#include <NewRemoteTransmitter.h>

#define RECEIVER_PIN 2
#define TRANSMITTER_PIN 11

void setup() {
  Serial.begin(9600);

  // Setup the NewRemoteReceiver, and disable it to not listen to rf signals
  NewRemoteReceiver::init(0, 2, learnCode);
  NewRemoteReceiver::disable();
}

void loop() {
  if (Serial.available() > 0) {
    String message = Serial.readString();

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(message);

    if (!root.success()) {
      Serial.println("Failed to parse Json");
      return;
    }

    // If JSON is valid further actions are determined by the type
    String type = root["type"];

    if (type == "LEARN_NEW_REMOTE") {
      Serial.println("Push remote to learn code");

      // Start receiving rf code
      NewRemoteReceiver::enable();
    } else if (type == "SEND_NEW_REMOTE") {
      unsigned long transmitterAddress = root["transmitterAddress"];
      byte unit = root["unit"];
      bool switchOn = root["switchOn"];

      // Send rf code
      NewRemoteTransmitter transmitter(transmitterAddress, TRANSMITTER_PIN);
      transmitter.sendUnit(unit, switchOn);
    }
  }
}

void learnCode(NewRemoteCode receivedCode) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();

  root["address"] = receivedCode.address;
  root["unit"] = receivedCode.unit;

  char buffer[256];
  root.printTo(buffer, sizeof(buffer));
  
  Serial.println(buffer);

  NewRemoteReceiver::disable();
}

