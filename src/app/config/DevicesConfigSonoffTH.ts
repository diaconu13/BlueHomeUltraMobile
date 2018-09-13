import { SignalTypeEnum } from "../convertors/signalTypeEnum";
import { UiDeviceTypeEnum } from "../convertors/UiDeviceTypeEnum";
import { DevicesConfigBase } from "./DevicesConfigBase";
import { Signal } from "../model/device/signal";
import * as _ from "underscore";
import * as format from "string-format";
import { State } from "../model/serviceModels/models";

export interface ISonoffTHSensorModel {
  Time    : Date;
  AM2301  : SonoffTHSignal;
  TempUnit: string;
}

export class SonoffTHSignal {
  Temperature: number;
  Humidity   : number;
}

export class DevicesConfigSonoffTH extends DevicesConfigBase {
  constructor() {
    super();
    // this.moduleName = "Sonoff T1 2CH";
    this.uiType  = UiDeviceTypeEnum.RelayTempHum;
    this.signals = [
      new Signal("POWER", SignalTypeEnum.Boolean, 0),
      new Signal("Temperature", SignalTypeEnum.Decimal, 0),
      new Signal("Humidity", SignalTypeEnum.Decimal, 0)
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
      "could not determine actual state value, on DevicesConfig_Sonoff_TH from Boolean To State Converter"
    );
    return undefined;
  }

  getCommandTopic(devTopicId: string, signalName?: string): String {
    switch (signalName) {
      case "POWER": 
        return format(this.config.mqtt.sonoffTopics.command, devTopicId);
      default: 
        return undefined;
    }
  }

  public convertToDBSignal(data: ISonoffTHSensorModel): State {

    const state:State       = new State();
          state.Humidity    = data.AM2301.Humidity;
          state.Temperature = data.AM2301.Temperature;
          state.Unit        = data.TempUnit;
          return state;
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

