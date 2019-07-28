#ifndef SerialDaikin_h
#define SerialDaikin_h

#if defined(ESP8266)
  #include <ESP8266WiFi.h>
  #include <ESPAsyncTCP.h>
#elif defined(ESP_PLATFORM)
  #include <WiFi.h>
  #include <AsyncTCP.h>
#endif

#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <AsyncArduinoJson6.h>
#include <TimeLib.h>
#include <SecurityManager.h>
#include <SettingsService.h>
#define SCAN_NETWORKS_SERVICE_PATH "/rest/getMessages"
#define LIST_NETWORKS_SERVICE_PATH "/rest/sendMessage"

#define MAX_WIFI_SCANNER_SIZE 1024

class SerialDaikinService:public SettingsService {

  public:

    SerialDaikinService(AsyncWebServer *server, FS* fs)
        : SettingsService(server, fs, "/serialSettings", "/config/serialSettings.json") {}
;
    ~SerialDaikinService();
  private:

    AsyncWebServer* _server;

    void getMessages(AsyncWebServerRequest *request);
    void sendMessage(AsyncWebServerRequest *request);



};

#endif // end WiFiScanner_h
