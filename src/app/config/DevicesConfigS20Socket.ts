import { UiDeviceTypeEnum } from "../convertors/UiDeviceTypeEnum";
import { SignalTypeEnum } from "../convertors/signalTypeEnum";
import { DevicesConfigBase } from "./DevicesConfigBase";
import { Signal } from "../model/device/signal";
import * as format from "string-format";

export class DevicesConfigS20Socket extends DevicesConfigBase {
  constructor() {
    super();
    // this.moduleName = "S20 Socket";
    this.uiType  = UiDeviceTypeEnum.Plug;
    this.signals = [new Signal("POWER", SignalTypeEnum.Boolean, 0)];
    this.icon    = "nb-power";
  }

  /**
   * Converts the boolean state that is stored in DB into actual object that is sent to device
   * in this case
   * {"POWER":"OFF"} / {"POWER":"ON"}
   */
  fromBooleanToStateConverter(value: boolean):any {
    if (this.signals[0].signalType === SignalTypeEnum.Boolean) {
      if (value) {
        return { signalName: "ON" };
      } else {
        return { signalName: "OFF" };
      }
    }
    console.error(
      "could not determine actual state value, on DevicesConfig_S20SocketfromBooleanToStateConverter"
    );
    return undefined;
  }

  getCommandTopic(devTopicId: string, signalName?: string): string {
    switch (signalName) {
      case "POWER": 
        return format(this.config.mqtt.sonoffTopics.command, devTopicId);
      default: 
        return format(this.config.mqtt.sonoffTopics.command, devTopicId);
    }
  }

  convertValue(value: any): any {
    if (typeof value === "number") {
      if (value === 0) {
        return "OFF";
      } else {
        return "ON";
      }
    }
  }
}
