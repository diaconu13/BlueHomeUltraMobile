import { Signal } from "./signal";
import { Document } from "mongoose";
import { Schedule } from "../schedule/Schedule";

export class Device {
  public _id            : String;
  public name           : String;
  public ip             : String;
  public icon           : String;
  public isCustomIcon   : Boolean;
  public mac            : String;
  public isActive       : Boolean;
  public isOnline       : Boolean;
  public isRegistered   : Boolean;
  public uptime         : Date;
  public uiDeviceType   : Number;
  public createdDate    : Date;
  public registeredDate : Date;
  public onlineState    : String;
  public softwareVersion: String;
  public module         : String;
  public restartReason  : String;
  public signals        : Signal[];
  public schedule       : Schedule[];
}

export interface IDevice extends Document {
  _id            : String;
  name           : String;
  ip             : String;
  icon           : String;
  isCustomIcon   : Boolean;
  mac            : String;
  isActive       : Boolean;
  isOnline       : Boolean;
  isRegistered   : Boolean;
  uptime         : Date;
  uiDeviceType   : Number;
  createdDate    : Date;
  registeredDate : Date;
  onlineState    : String;
  softwareVersion: String;
  module         : String;
  restartReason  : String;
  signals        : Signal[];
  schedule       : Schedule[];
}
