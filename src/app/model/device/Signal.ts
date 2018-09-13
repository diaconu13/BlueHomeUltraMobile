
export class Signal {
  deviceId   : String;
  name       : String;
  value      : Number;
  unit       : String;
  signalType : Number;
  time       : Date;
  changedById: String;

  constructor(name: String, signalType: Number, value: Number, unit: string = "") {
    this.name       = name;
    this.value      = value;
    this.signalType = signalType;
    this.unit       = unit;
  }
}