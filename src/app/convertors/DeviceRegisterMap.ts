import { DeviceMap } from "./deviceMap";

export class DeviceRegisterMap extends DeviceMap {
    name        : string;
    ip          : string;
    mac         : string;
    icon        : string;
    isCustomIcon: boolean;
    
    constructor(ip: string,mac:string, typeName: string, name: string, icon:string, isCustomIcon: boolean) {
        super();
        this.ip           = ip;
        this.mac          = mac;
        this.typeName     = typeName;
        this.name         = name;
        this.icon         = icon;
        this.isCustomIcon = isCustomIcon;
    }
}