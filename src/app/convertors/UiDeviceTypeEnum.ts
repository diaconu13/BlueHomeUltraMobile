export enum UiDeviceTypeEnum {
  Unknown      = 0,
  Relay        = 1,
  Plug         = 2,
  Temp         = 4,
  Hum          = 5,
  Light        = 6,
  ColorLight   = 7,
  ContactSW    = 8,
  ContactSW2   = 9,
  ContactSW3   = 10,
  PIR          = 11,
  RF           = 12,
  Plug2        = 13,   //can be represented as 4 plugs 
  Relay2       = 14,   //can be represented as 4 buttons
  Plug4        = 15,   //can be represented as 4 plugs 
  Relay4       = 16,   //can be represented as 4 buttons
  RelayTempHum = 17,
  Gate         = 18,
}
