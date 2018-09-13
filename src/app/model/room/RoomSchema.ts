import { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: { type: string; required: true };
}

export class Room extends Document {
  _id : String;
  name: string;
}

export default new Schema({
  name: { type: String, required: true },
});
