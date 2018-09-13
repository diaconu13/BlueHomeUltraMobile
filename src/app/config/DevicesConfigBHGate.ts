import { SignalTypeEnum } from "../convertors/signalTypeEnum";
import { UiDeviceTypeEnum } from "../convertors/UiDeviceTypeEnum";
import { DevicesConfigBase } from "./DevicesConfigBase";
import { Signal } from "../model/device/signal";
import * as _ from "underscore";
import * as format from "string-format";
import { GateStateEnum } from "../convertors/GateStateEnum";
/**
 * This is the gate device
 * POWER 1 on is Gate Opening 
 * POWER 2 on is Gate Closing
 * POWER 1 and 2 off is Gate Stop
 * Functionality is identical with DevicesConfig_Sonoff_T1_2CH, is basically a DevicesConfig_Sonoff_T1_2CH device making the all thing but with different UI
 */
export class DevicesConfigBHGate extends DevicesConfigBase {

  constructor() {
    super();
    
    // this.moduleName = "Sonoff T1 2CH";
    this.uiType  = UiDeviceTypeEnum.Gate;
    this.signals = [
      new Signal("POWER1", SignalTypeEnum.Boolean, 0),// open command relay
      new Signal("POWER2", SignalTypeEnum.Boolean, 0),// close command relay
      new Signal("GATE", SignalTypeEnum.Int, GateStateEnum.Undeffined)// state feedback from gate sensor
    ];
  }

  /**
   * Converts the boolean state that is stored in DB into actual object that is sent to device
   * in this case
   * {"POWER1":"OFF"} / {"POWER1":"ON"}  {"POWER2":"OFF"} / {"POWER2":"ON"} {"GATE":"stringvalue"} / {"GATE":"Stringvalue"}
   */
  fromBooleanToStateConverter(value: Boolean, signalName: String):any {
    if (!signalName) {
      signalName = this.signals[0].name;
    }
    const signal:Signal[] = _.where(this.signals, s => s.name == signalName);
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
      "could not determine actual state value, on DevicesConfig_BH_Gate Socket from Boolean To State Converter"
    );
    return undefined;
  }

  getCommandTopic(devTopicId: string, signalName?: string): String {
    switch (signalName) {
      case "POWER1":// open 
        return format(this.config.mqtt.sonoffTopics.command1, devTopicId);
      case "POWER2": // close
        return format(this.config.mqtt.sonoffTopics.command2, devTopicId);
      // case "GATE": //state feedback from gate
      //   return format(this.config.mqtt.sonoffTopics.command2, devTopicId);
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
