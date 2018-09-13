import { Document } from "mongoose";
/**
 *
 *
 * @export
 * @interface IConfiguration
 * @extends {Document}
 */
export interface IConfiguration extends Document {
    title: { type: string; required: true };
    value: string;
  }

/**
 *
 *
 * @export
 * @class Configuration
 * @extends {Document}
 */
export class Configuration extends Document {
  _id  : String;
  name : string;
  value: string;
}