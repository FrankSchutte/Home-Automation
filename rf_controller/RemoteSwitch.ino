void receiveRemoteSwitch() {
  RemoteReceiver::init(0, 2, learnRemoteSwitch);
}

void learnRemoteSwitch(unsigned long receivedCode, unsigned int period) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &res = jsonBuffer.createObject();
  JsonObject &command = res.createNestedArray("command").createNestedObject();

  command["code"] = receivedCode;
  command["period"] = period;

  printJsonObject(res);
  
  RemoteReceiver::deinit();
}

void sendRemoteSwitch(JsonObject &command) {
  unsigned long code = command["code"];
  unsigned long period = command["period"];

  // Send rf code
  RemoteTransmitter::sendCode(TRANSMITTER_PIN, code, period, 3);
}

