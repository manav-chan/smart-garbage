#include <SoftwareSerial.h>
#include "WiFiEsp.h"
#include "ThingSpeak.h"

WiFiEspClient client;

int status = WL_IDLE_STATUS;
SoftwareSerial esp8266(4, 5); // RX, TX

const int TRIG_PIN = 8;
const int ECHO_PIN = 7;
const int HEIGHT = 29;

float duration, distance, percentage;
bool flag1, flag2;

void setup() {

  pinMode( TRIG_PIN, OUTPUT );
  pinMode( ECHO_PIN, INPUT);
  flag1 = false, flag2 = false;
  Serial.begin( 9600 );
  ThingSpeak.begin(client);
}

void loop() {

  digitalWrite( TRIG_PIN, LOW );

  delayMicroseconds(2);

  digitalWrite( TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = ( duration * 0.0343 ) / 2;

  percentage = ((HEIGHT - distance) / HEIGHT) * 100;

  Serial.print(percentage);
  Serial.println("%");

  if(percentage > 70) {
    flag1 = true;
  }
  else {
    flag1 = false;
    flag2 = false;
  }

  if(flag1 && !flag2) {
    Serial.print("Dustbin Nearly Full! ");
    Serial.print(percentage);
    Serial.println("%");
    delay(600000);

    flag2 = true;
  }
  delay(10000);
}