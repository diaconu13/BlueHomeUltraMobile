import { Schema } from "mongoose";
export default new Schema({
  name: {
    type    : String,
    required: true
  },
  ip          : String,
  icon        : String,
  isCustomIcon: Boolean,
  mac         : {
    type    : String,
    required: true
  },
  isActive       : Boolean,
  isOnline       : Boolean,
  isRegistered   : Boolean,
  uptime         : Date,
  uiDeviceType   : Number,
  createdDate    : Date,
  registeredDate : Date,
  onlineState    : String,
  softwareVersion: String,
  module         : String,
  restartReason  : String,
  signals        : [
    {
      deviceId   : String,
      name       : String,
      value      : Number,
      unit       : String,
      signalType : Number,
      time       : Date,
      changedById: String
    }
  ],
  schedule: [
    {
      start             : String,
      end               : String,
      isStartSunset     : Boolean,
      isStartSunrise    : Boolean,
      isEndSunset       : Boolean,
      isEndSunrise      : Boolean,
      duration          : String,
      stateStart        : String,
      stateEnd          : String,
      weekDays          : [],
      startSelectedState: String,
      endSelectedState  : String,
      selectedSignal: {
          deviceId   : String,
          name       : String,
          value      : Number,
          unit       : String,
          signalType : Number,
          time       : Date,
          changedById: String
      },
    }
  ]
});
