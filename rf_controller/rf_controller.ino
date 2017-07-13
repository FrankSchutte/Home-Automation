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
    JsonObject &req = jsonBuffer.parseObject(message);
    JsonObject &res = jsonBuffer.createObject();

    if (!req.success()) {
      res["err"] = "Failed to parse JSON";
      
      printJsonObject(res);
      return;
    }

    // If JSON is valid further actions are determined by the type and protocol
    String type = req["type"];
    String protocol = req["protocol"];

    if (type.equals("LEARN_CODE")) {
      if (protocol.equals("NEW_REMOTE")) {
        // Start receiving rf code
        NewRemoteReceiver::enable();
      }
    } else if (type.equals("SEND_CODE")) {
      if (protocol.equals("NEW_REMOTE")) {
        JsonObject &commands = req["commands"][0];
        
        unsigned long transmitterAddress = commands["transmitterAddress"];
        byte unit = commands["unit"];
        bool switchOn = commands["switchOn"];

        // Send rf code
        NewRemoteTransmitter transmitter(transmitterAddress, TRANSMITTER_PIN);
        transmitter.sendUnit(unit, switchOn);
        
        res["success"] = "Device has been toggled";
        
        printJsonObject(res);
      }
    }
  }
}

void learnCode(NewRemoteCode receivedCode) {
  // Stop receiving rf signals
  NewRemoteReceiver::disable();

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &res = jsonBuffer.createObject();
  JsonObject &commands = res.createNestedArray("commands").createNestedObject();

  commands["transmitterAddress"] = receivedCode.address;
  commands["unit"] = receivedCode.unit;

  printJsonObject(res);
}

void printJsonObject(JsonObject &jsonObject) {
  char buffer[256];

  jsonObject.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
}

