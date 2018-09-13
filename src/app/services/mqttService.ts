import { Command } from "../model/commands/Command";

import * as ip from "ip";
//import * as mqtt from "mqtt";
import * as format from "string-format";
import { DeviceController } from "../model/device/DeviceController";
import { IDevice, Device } from "../model/device/Device";
import { State, CommunicationBase } from "../model/serviceModels/models";
import { Config } from "../config/bhconfig";

import { DevicesConfigBase } from "../config/DevicesConfigBase";

import {
  ISonoffTHSensorModel,
  DevicesConfigSonoffTH
} from "../config/DevicesConfigSonoffTH";

/**
 * @export
 * @class MqttService
 */
export class MqttService {
  config           : Config;
  devicesController: DeviceController;
  localIpStart     : string;
  client           : any;

  constructor(
    _config          : Config,
    devicesController: DeviceController,
    doNotInitialize  : boolean
  ) {
    // console.log(_config);
    this.config = _config;
    console.log("mqtt service started");
    this.devicesController = devicesController;
    this.initMqtt();
    if (!doNotInitialize) {
      this.subscribeToDevices();
    }

    this.localIpStart = this.getIpStart();
  }

  setCommand(device: IDevice, command: Command): any {
    const devTopicId: string        = this.getDeviceTopic(device);
    const config: DevicesConfigBase = this.devicesController.getDeviceConfig(
      device.module
    );
    const value: string         = config.convertValue(command.value);
    const topicCmdState: String = config.getCommandTopic(
      devTopicId,
      command.signalName
    );
    console.log(
      "MqttService.setCommand -> publishing on ",
      topicCmdState,
      value
    );
    return this.client.publish(topicCmdState, value);
  }

  getIpStart(): string {
    console.log(ip.address());
          this.localIpStart  = "192.168.1.1";                 // ip.address();
    const ipChunks: string[] = this.localIpStart.split(".");
    return format("{0}.{1}.{2}.", ipChunks[0], ipChunks[1], ipChunks[2]);
  }

  /**
   * create default subscribers for
   *  tele/dev_100/INFO1
   *  tele/dev_100/INFO2
   *  tele/dev_100/INFO3
   * @param {IDevice} device
   */
  subscribeToUnregisteredDevice(device: IDevice): void {
    console.log("subscribeToUnregisteredDevice");
    // doc.ip
    const devTopic: string = this.getDeviceTopic(device);
    console.log("devTopic", devTopic);
    // create topics subscriptions
    const topicLWT: string = format(
      this.config.mqtt.sonoffTopics.lwt,
      devTopic
    );
    const topicState: string = format(
      this.config.mqtt.sonoffTopics.state,
      devTopic
    );
    const topicMqtt: string = format(
      this.config.mqtt.sonoffTopics.infoMqtt,
      devTopic
    );
    const topicWebServer: string = format(
      this.config.mqtt.sonoffTopics.infoWebServer,
      devTopic
    );
    const topic3: string = format(
      this.config.mqtt.sonoffTopics.infoEvents,
      devTopic
    );
    const topicResult: string = format(
      this.config.mqtt.sonoffTopics.result,
      devTopic
    );
    const topicPower: string = format(
      this.config.mqtt.sonoffTopics.command,
      devTopic
    );
    const topicCmdState: string = format(
      this.config.mqtt.sonoffTopics.commandState,
      devTopic
    );
    const topicTelemetrySensor: string = format(
      this.config.mqtt.sonoffTopics.sensor,
      devTopic
    );

    this.client.subscribe(topicLWT);
    this.client.subscribe(topicResult);
    this.client.subscribe(topicState);
    this.client.subscribe(topicMqtt);
    this.client.subscribe(topicWebServer);
    this.client.subscribe(topic3);
    this.client.subscribe(topicPower);
    this.client.subscribe(topicTelemetrySensor);

    // ask for device infos
    this.client.publish(topicCmdState, "?");

    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicLWT);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicState);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicMqtt);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicWebServer);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topic3);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicResult);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicPower);
    // tslint:disable-next-line:no-console
    console.info("subscribed to: " + topicTelemetrySensor);
  }

  private getDeviceTopic(device: IDevice): string {
    let mac: String;
    if (device.mac) {
      mac = device.mac;
    }
    if (device.mac) {
      const devTopic: string = 
        "dev_" +
        mac
          .replace(":", "")
          .replace(":", "")
          .replace(":", "")
          .replace(":", "")
          .replace(":", "");
      return devTopic;
    }
    console.log("device does not have mac address device id:" + device.id);
    return "";
  }

  subscribeToDevices(): void {
    this.devicesController
      .getAll()
      .then((devices: IDevice[]) => {
        console.log("got " + devices.length + " devices");
        devices.forEach((device: IDevice) => {
          if (!device.isRegistered) {
            if (device && device.mac) {
              this.subscribeToUnregisteredDevice(device);
            } else {
              console.log("device has no IP ", device);
            }
          } else if (device && device.mac) {
            this.subscribeToUnregisteredDevice(device);
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  initMqtt(): void {
    // by default devices connect on
    /*
        tele/dev_2D7983/INFO100 = {'Module':'Sonoff Dual R2','Version':'5.14.0','FallbackTopic':'DVES_9E7915','GroupTopic':'sonoffs'}
        tele/dev_100/INFO2      = {'WebServerMode':'Admin','Hostname':'sonoff-6421','IPAddress':'192.168.1.189'}
        tele/dev_100/INFO3      = {'RestartReason':'Software/System restart'}
    */

    // this.client = mqtt.connect(this.config.mqtt.server);

    // const this_: MqttService = this;
    // this.client.on("connect", function(): void {
    //   // tslint:disable-next-line:no-console
    //   console.info("mqtt connected on server ", this_.config.mqtt.server);
    // });

    // this.client.on("message", function(topic: String, message: Buffer): void {
    //   try {
    //     // message is Buffer
    //     let data: any          = {};
    //     let dataString: string = message.toString();

    //     try {
    //       if (topic.indexOf("cmnd") > -1) {
    //         console.log("cmnd skipped: " + dataString);
    //         return;
    //       }
    //       if (!topic.endsWith("LWT") && message.length > 0) {
    //         data = JSON.parse(dataString);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       console.log("dataString: " + dataString);
    //     }
    //     // todo change the way that device are identified
    //     if (data) {
    //       const topicName: string = topic.split("/")[2];
    //       const mac: string       = topic.split("/")[1].split("_")[1];
    //       // 000a959d6816
    //       // 00 0a 95 9d 68 16
    //       // 01 23 45 67 89 1011
    //       // tslint:disable-next-line:max-line-length
    //       const formatedMac: string = 
    //         mac.slice(0, 2) +
    //         ":" +
    //         mac.slice(2, 4) +
    //         ":" +
    //         mac.slice(4, 6) +
    //         ":" +
    //         mac.slice(6, 8) +
    //         ":" +
    //         mac.slice(8, 10) +
    //         ":" +
    //         mac.slice(10, 12);

    //       this_.devicesController.getByMac(formatedMac).then(device => {
    //         if (!device) {
    //           console.error("could not find device with mac :" + mac);
    //           return;
    //         }
    //         return this_.performTopicAction(
    //           device,
    //           topicName,
    //           data,
    //           dataString
    //         );
    //       });
    //     }

    //     // apply filtering here and require controllers and call functions for persitance to be made
    //     // this_.client.end();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
  }

  performTopicAction(
    device    : Device,
    topicName : string,
    data      : CommunicationBase,
    dataString: string
    )         : any {
    console.log("got topic name ", topicName);

    switch (topicName) {
      case "LWT":   // online
        console.log("got LWT from ", device.ip, dataString);
        this.devicesController.setOnlineState(
          device,
          dataString.indexOf("Online") > -1
        );
        break;
      case "INFO1":   // {'Module':'S20 Socket','Version':'5.14.0','FallbackTopic':'DVES_2D7983','GroupTopic':'sonoffs'}
        // this_.devicesController.updateInfoWeb(deviceFullIp, data);
        break;
      case "INFO2":   // {'WebServerMode':'Admin','Hostname':'dev_100-6531','IPAddress':'192.168.1.100'}
        break;
      case "INFO3":   // {'RestartReason':'Power on'}
        // this_.devicesController.updateInfoEvent(deviceFullIp, data);
        break;
      case  "RESULT":                         // {'POWER':'OFF'}
      const state   : State = data as State;
        console.log("state: ", state);

        this.devicesController.updateDeviceSignal(device, state);
        console.log("got RESULT from ", device.ip, dataString);

        // if (data) {
        //   switch (device.module){
        //     case "BH Gate":
        //     const state    = data as State;
        //     const config   = this.devicesController.getDeviceConfig(device.module) as DevicesConfig_BH_Gate;
        //     this.devicesController.updateDeviceSignal(device, state);
        //     break;
        //   }
        // }
        // this_.devicesController.updateDeviceSignal(deviceFullIp, data);
        break;
      // tslint:disable-next-line:max-line-length
      case "STATE":   // {'Time':'2018-06-19T06:25:40','Uptime':'0T00:00:13','Vcc':3.186,'POWER':'OFF','Wifi':{'AP':1,'SSId':'Dan Home','RSSI':100,'APMac':'9C:5C:8E:47:9E:08'}}
        if (data) {
          const state: State = data as State;

          this.devicesController.updateDeviceSignal(device, state);
        }
        break;
      case "SENSOR":   // {"Time":"2018-06-07T20:47:07","AM2301":{"Temperature":24,"Humidity":63.0},"TempUnit":"C"}
        if (data) {
          switch (device.module) {
            case  "Sonoff TH": 
            const state      : ISonoffTHSensorModel = data as ISonoffTHSensorModel;
            const config     : DevicesConfigSonoffTH = this.devicesController.getDeviceConfig(
                device.module
              ) as DevicesConfigSonoffTH;
              const newState: State = config.convertToDBSignal(state);

              this.devicesController.updateDeviceSignal(device, newState);
              break;
          }
        }
        break;
      case "POWER": 
        break;
      case "POWER1": 
        break;
      case "POWER2": 
        break;
      case "POWER3": 
        break;
      case "POWER4": 
        break;

      default: 
        break;
    }
  }
}
// https://github.com/mqttjs/MQTT.js/
