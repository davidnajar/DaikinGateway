#ifndef ArduinoJsonJWT_H
#define ArduinoJsonJWT_H

#include <Arduino.h>
#include <ArduinoJson.h>
#include <libb64/cdecode.h>
#include <libb64/cencode.h>
#if defined(ESP_PLATFORM)
  #include <mbedtls/md.h>
#else
  #include <bearssl/bearssl_hmac.h>
#endif 

class ArduinoJsonJWT {

private:
  String _secret;

  const String JWT_HEADER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const int JWT_HEADER_SIZE = JWT_HEADER.length();

  String sign(String &value);

  static String encode(const char *cstr, int len);
  static String decode(String value);

public:
  ArduinoJsonJWT(String secret);

  void setSecret(String secret);
  String getSecret();
  
  String buildJWT(JsonObject &payload);
  void parseJWT(String jwt, JsonDocument &jsonDocument);
};


#endif
