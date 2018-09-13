export interface IConfig {
    mqtt: {
        topics: {
            registration: string;
            sensors     : string;
            commands    : string;
            state       : string;
            devices     : string;
        };
        sonoffTopics: {
            lwt          : string;
            uptime       : string;
            infoMqtt     : string;
            infoWebServer: string;
            infoEvents   : string;
            result       : string;
            state        : string;
            sensor       : string;
            command      : string;
            command1     : string;
            command2     : string;
            reult1       : string;
            reult2       : string;
        };
        server: string;

    };
}
export class Config {
    public mqtt =
     {
        "topics": {
            "registration": "/devices/registration",
            "sensors"     : "/devices/sensors",
            "commands"    : "/devices/commands",
            "state"       : "/devices/state",
            "devices"     : "/devices/#"
        },
        "sonoffTopics": {
            "lwt"          : "tele/{0}/LWT",
            "uptime"       : "tele/{0}/UPTIME",
            "infoMqtt"     : "tele/{0}/INFO1",
            "infoWebServer": "tele/{0}/INFO2",
            "infoEvents"   : "tele/{0}/INFO3",
            "result"       : "stat/{0}/RESULT",
            "state"        : "tele/{0}/STATE",
            "sensor"       : "tele/{0}/SENSOR",
            "commandState" : "cmnd/{0}/STATE",
            "command"      : "cmnd/{0}/POWER",
            "command1"     : "cmnd/{0}/POWER1",
            "command2"     : "cmnd/{0}/POWER2",
            "command3"     : "cmnd/{0}/POWER3",
            "command4"     : "cmnd/{0}/POWER4",
            "result1"      : "stat/{0}/POWER1",
            "result2"      : "stat/{0}/POWER2",
            "result3"      : "stat/{0}/POWER3"
        },
        //"server": "mqtt://localhost"
         "server": "mqtt://192.168.1.234"
    };

    "pubnub": {
        "publish_key"    : "pub-c-17fcb2d5-85ec-4d16-b1df-45ca7a06be28",
        "subscribe_key"  : "sub-c-17032738-37cb-11e6-a9ba-02ee2ddab7fe",
        "devices_channel": "smart_home_devices",
        "getdevices"     : "/devices/getdevices"
    };
}