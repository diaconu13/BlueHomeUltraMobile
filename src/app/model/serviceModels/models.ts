
export class CommunicationBase {
}

export class State extends CommunicationBase {
  Time       : Date;
  Uptime     : Date;
  Vcc        : number;
  POWER      : string;
  POWER1     : string;
  POWER2     : string;
  POWER3     : string;
  POWER4     : string;
  GATE       : string;
  Temperature: number;
  Humidity   : number;
  Wifi       : WiFi;
  Unit       : string;
}


export class WiFi extends CommunicationBase {
  AP   : number;
  SSId : string;
  RSSI : number;
  APMac: string;
}

export class Info extends CommunicationBase {
  Module        : string = "S20 Socket";
  Version       : string = "5.14.0";
  FallbackTopic: string  = "DVES_2D7983";
  GroupTopic    : string = "sonoffs";
}


