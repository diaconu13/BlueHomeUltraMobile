import { SignalTypeEnum } from "../convertors/signalTypeEnum";
import { UiDeviceTypeEnum } from "../convertors/UiDeviceTypeEnum";
import { DevicesConfigBase } from "./DevicesConfigBase";
import { Signal } from "../model/device/signal";
import * as _ from "underscore";
import * as format from "string-format";

export class DevicesConfigSonoff4CH extends DevicesConfigBase {
  constructor() {
    super();
    // this.moduleName = "Sonoff T1 2CH";
    this.uiType  = UiDeviceTypeEnum.Relay2;
    this.signals = [
      new Signal("POWER1", SignalTypeEnum.Boolean, 0),
      new Signal("POWER2", SignalTypeEnum.Boolean, 0),
      new Signal("POWER3", SignalTypeEnum.Boolean, 0),
      new Signal("POWER4", SignalTypeEnum.Boolean, 0)
    ];
  }

  /**
   * Converts the boolean state that is stored in DB into actual object that is sent to device
   * in this case
   * {"POWER1":"OFF"} / {"POWER1":"ON"}  {"POWER2":"OFF"} / {"POWER2":"ON"}
   */
  fromBooleanToStateConverter(value: Boolean, signalName: String):any {
    if (!signalName) {
      signalName = this.signals[0].name;
    }
    const signal:Signal[] = _.where(this.signals, s => s.name === signalName);
    if (
      signal &&
      signal.length > 0 &&
      signal[0].signalType === SignalTypeEnum.Boolean
    ) {
      if (value) {
        return { signalName: "ON" };
      } else {
        return { signalName: "OFF" };
      }
    }
    console.error(
      "could not determine actual state value, on Devices Sonoff 4CH Socket from Boolean To State Converter"
    );
    return undefined;
  }

  getCommandTopic(devTopicId: string, signalName?: string): String {
    switch (signalName) {
      case "POWER1": 
        return format(this.config.mqtt.sonoffTopics.command1, devTopicId);
      case "POWER2": 
        return format(this.config.mqtt.sonoffTopics.command2, devTopicId);
      case "POWER3": 
        return format(this.config.mqtt.sonoffTopics.command3, devTopicId);
      case "POWER4": 
        return format(this.config.mqtt.sonoffTopics.command4, devTopicId);
      default: 
        return undefined;
    }
  }

  convertValue(value: any): string {
    if (typeof value === "number") {
      if (value === 0) {
        return "OFF";
      } else {
        return "ON";
      }
    }
  }
}
