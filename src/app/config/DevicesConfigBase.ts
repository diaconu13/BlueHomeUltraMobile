import { UiDeviceTypeEnum } from "../convertors/UiDeviceTypeEnum";
import { SignalTypeEnum } from "../convertors/signalTypeEnum";
import { Signal } from "../model/device/signal";

import { Config } from "./bhconfig";

/**
 * this is the file where each type of device has a predevined structure that the business logic will use
 */
export class DevicesConfigBase { 
  signals: Signal[];
  uiType : UiDeviceTypeEnum;
  config : Config;
  icon   : string;

  constructor() {
    this.uiType  = UiDeviceTypeEnum.Relay;
    this.signals = [new Signal("POWER", SignalTypeEnum.Boolean, 0)];
    this.config  = new Config();
    this.icon    = "nb-power";
  }

  getCommandTopic(devTopicId: string, signalName?: string): String {
    throw new Error("Method not implemented.");
  }

  convertValue(value: any): string {
    throw new Error("Method not implemented.");
  }
}
