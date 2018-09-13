export interface ISignal extends Document {
  deviceId   : String;
  changedById: String;
  signalName : String;
  value      : Number;
  unit       : String;
  signalType : Number;
  time       : Date;
}

export class Signal {
  deviceId   : String;
  changedById: String;
  signalName : String;
  value      : Number;
  unit       : String;
  signalType : Number;
  time       : Date;
}
