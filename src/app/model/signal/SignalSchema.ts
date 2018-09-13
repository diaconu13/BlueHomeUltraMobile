const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default new Schema({
  deviceId   : String,
  changedById: String,
  signalName : String,
  value      : Number,
  unit       : String,
  signalType : Number,
  time       : Date
});
