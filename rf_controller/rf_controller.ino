/*
   RF controller to control my home outlets.

   Make sure to connect the receiver to digital pin 2, and the transmitter to digital pin 11.
*/

#include <ArduinoJson.h>
#include <RemoteReceiver.h>
#include <RemoteTransmitter.h>
#include <NewRemoteReceiver.h>
#include <NewRemoteTransmitter.h>

#define RECEIVER_PIN 2
#define TRANSMITTER_PIN 11

void setup() {
  Serial.begin(9600);
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
    
    boolean actionPerformed = false;

    if (type.equals("LEARN_COMMAND")) {
      if (protocol.equals("REMOTE_SWITCH")) {
        receiveRemoteSwitch();
        actionPerformed = true;
      }
      else if (protocol.equals("NEW_REMOTE_SWITCH")) {
        receiveNewRemoteSwitch();
        actionPerformed = true;
      }
    } else if (type.equals("SEND_COMMAND")) {
      JsonObject &command = req["command"][0];

      if (protocol.equals("REMOTE_SWITCH")) {
        sendRemoteSwitch(command);
      }
      else if (protocol.equals("NEW_REMOTE_SWITCH")) {
        sendNewRemoteSwitch(command);
      }

      res["success"] = "Command was successfully sent";
      printJsonObject(res);

      actionPerformed = true;
    }

    if (!actionPerformed) {
      res["err"] = "Type or protocol was incorrect";
      printJsonObject(res);
    }
  }
}

void printJsonObject(JsonObject &jsonObject) {
  char buffer[256];

  jsonObject.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
}

