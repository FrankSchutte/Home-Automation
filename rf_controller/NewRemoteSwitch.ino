void receiveNewRemoteSwitch() {
  NewRemoteReceiver::init(0, 2, learnNewRemoteSwitch);
}

void learnNewRemoteSwitch(NewRemoteCode receivedCode) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &res = jsonBuffer.createObject();
  JsonObject &command = res.createNestedArray("command").createNestedObject();

  command["transmitterAddress"] = receivedCode.address;
  command["unit"] = receivedCode.unit;

  printJsonObject(res);

  NewRemoteReceiver::deinit();
}

void sendNewRemoteSwitch(JsonObject &command) {
  unsigned long transmitterAddress = command["transmitterAddress"];
  byte unit = command["unit"];
  bool switchOn = command["switchOn"];

  // Send rf code
  NewRemoteTransmitter transmitter(transmitterAddress, TRANSMITTER_PIN);
  transmitter.sendUnit(unit, switchOn);
}

