import { Document, Schema } from "mongoose";

export interface IConfiguration extends Document {
  title: { type: string; required: true };
  value: string;
}


export default new Schema({
  name : { type: String, required: true },
  value: String
});
