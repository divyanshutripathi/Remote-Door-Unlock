#include <ESP8266WiFi.h>
// including the library for publisher and subcriber MQTT
#include <PubSubClient.h>
//#include <ArduinoJson.h>

const char* ssid="dt";// type your wifi name here
const char* password="dtri131221";// type your password here
const char* mqttServer="18.216.98.10";// type your aws server ip
const int mqttPort=1883;//Write the mqtt port no.

WiFiClient esp;
PubSubClient node(esp);
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);//setting the baudrate
  WiFi.begin(ssid,password);// begin the wifi connection
 
  pinMode(5,OUTPUT);
  //pinMode(16,OUTPUT);// set the pin mode in  OUTPUT or INPUT mode
  while(WiFi.status()!=WL_CONNECTED) //checking till the wifi is connected
  {
    Serial.println("Connecting to WiFi............");
    delay(500);
  }
  Serial.println("Connected to Wifi!");
  node.setServer(mqttServer,mqttPort);//connecting to the MQTT server
  node.setCallback(callback);
  while(!node.connected()) // if connected to mqtt move forward to loop
   {
   Serial.println("Connecting to MQTT.........");
   delay(500);
    if (node.connect("ESP8266Client")) {
      Serial.println("connected");  
      } 
      else {              //if failed then  print failed and try to connect again
      Serial.print("failed with state ");
      Serial.print(node.state());
      delay(2000);
    }
   }
   node.subscribe("unlock");
}


void callback(char* topic, byte* payload, unsigned int length)//callback function for receiving the values 
{
  Serial.print("Recieved on topic: ");
  Serial.println(topic);
  //Serial.print((char)payload[1]);
//  for(int i=0;i<length;i++)
//  {
//  Serial.print((char)payload[i]);
//  }

  if(payload[0]==49)    //if the msg sent is 49 then switch the led on
  {
    digitalWrite(5,HIGH);
    delay(10*1000);
//    delay(500);
   digitalWrite(5,LOW);
  }
  else
  {
    Serial.println("Nothing received");
  }
//for(int i=0;i<length;i++)
//  Serial.println(payload[i]);
}

void loop() {
  // put your main code here, to run repeatedly:
node.loop();
}


