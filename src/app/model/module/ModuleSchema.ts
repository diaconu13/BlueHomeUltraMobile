import { Document, Schema } from "mongoose";

export interface IModule extends Document {
  title: { type: string; required: true };
  value: string;
}

export class Module extends Document {
  _id  : String;
  name : string;
  value: string;
}

export default new Schema({
  name : { type: String, required: true },
  value: String
});
