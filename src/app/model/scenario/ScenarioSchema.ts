import { Document, Schema } from "mongoose";

export interface IScenario extends Document {
  title: { type: string; required: true };
  jsonBody: string;
}

export class Scenario extends Document {
  _id: String;
  title: string;
  jsonBody: string;
}

export default new Schema({
  title: { type: String, required: true },
  jsonBody: String
});