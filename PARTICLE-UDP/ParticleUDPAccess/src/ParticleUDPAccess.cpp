/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "application.h"
#line 1 "/Users/se/Documents/PARTICLE-UDP/ParticleUDPAccess/src/ParticleUDPAccess.ino"
/*
 * Project ParticleUDPAccess
 * Description:
 * Author:
 * Date:
 * https://docs.particle.io/reference/device-os/firmware/photon/#udp
 */
void setup();
void loop();
#line 8 "/Users/se/Documents/PARTICLE-UDP/ParticleUDPAccess/src/ParticleUDPAccess.ino"
SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(MANUAL);

UDP Udp;

//port of udp server
const int SEND_UDP_PORT = 9998;
// remote ip address (of UDP SERVER)
 IPAddress remoteIP(172,20,10,4);
 //10.115.140.75.
 //172.20.10.4.

const size_t bufferSize = 64; //number of bytes in the packet
char buffer[bufferSize];

// DELAY BETWEEN PACKETS::
const int P_DELAY = 5000;

//NAME OF THIS PARTICLE:
char particleName[] = "Particle-B";

// test variables :::
int valOne;
int valTwo;


// FOR RECEIVING::
char message[128];
// port that THIS device listens on in case it will receive something :)
const int LISTENING_PORT = 8888;
int rxError = 0;


void setup() {

  Serial.begin(9600);
    while(Serial==false);
  Serial.println("test the serial!"); 
  // have to explicitly connect to wifi
  WiFi.connect();
  while(WiFi.ready()==false);

 // pinMode(A0, INPUT);
 //start udp to LISTEN on this port
  Udp.begin(LISTENING_PORT);   




  // the local ip of this device
  Serial.println(WiFi.localIP());
}

void loop() 
{
 // int light = analogRead(A0);

   // lets do some random generation to show changing values... 
  valOne = rand() % 514 + 1;
  valTwo = rand() % 1023 + 1;

  /*** int sprintf ( char * str, const char * format, ... );

Write formatted data to string::
Lets make a nice looking packet :::
//start, name, val1, val2, val3, end//
***/
  sprintf (buffer, "start,%s,%d,%d,%d,end", particleName, valOne, valTwo, valOne+valTwo);
  //printf ("[%s] is a string %d chars long\n",buffer,n);
  
  // send the packet to the udp server ... 

    Udp.sendPacket(buffer, bufferSize, remoteIP, SEND_UDP_PORT);
    delay(P_DELAY);


    // CODE TO RECEIVE .. 
    int count = Udp.receivePacket((byte*)message, 127);
    if (count >= 0 && count < 128) {
      //Serial.println("got a message");
      //end delimiter ... 
      message[count] = 0;
      rxError = 0;
     } else if (count < -1) {
     rxError = count;
     // need to re-initialize on error
    Udp.begin(LISTENING_PORT);
} 
 if (!rxError) {
  Serial.println (message);
}
}

