import { Facade, IFacade } from "../../lib/facade";
import * as schema from "./DeviceSchema";


export interface IDeviceFacade extends IFacade { }

export default class DeviceFacade  extends Facade implements IFacade  {
    constructor() {
        super("Device", schema.default);
    }
}