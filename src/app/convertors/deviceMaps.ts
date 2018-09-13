import { DeviceMap } from "./deviceMap";

import { UiDeviceTypeEnum } from "./UiDeviceTypeEnum";
import { SignalTypeEnum } from "./signalTypeEnum";
/**
 * This contains the mapping from model to device type and Ui type and signal type
 * A device has a typeName that maps to a uiType and a Signal/Signals Type
 * on signal type the order is important
 */
export class DeviceMaps {
    public mappings: DeviceMap[] = [
        { typeName: "Sonoff Basic", uiType: UiDeviceTypeEnum.Relay, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff RF", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff SV", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff TH", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff Dual", uiType: UiDeviceTypeEnum.Relay2, signalType: [SignalTypeEnum.Boolean, SignalTypeEnum.Boolean] },
        { typeName: "Sonoff Pow", uiType: UiDeviceTypeEnum.Relay, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff 4CH", uiType: UiDeviceTypeEnum.Relay4, signalType: [SignalTypeEnum.Boolean, SignalTypeEnum.Boolean, SignalTypeEnum.Boolean, SignalTypeEnum.Boolean] },
        { typeName: "S20 Socket", uiType: UiDeviceTypeEnum.Plug, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Slampher", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff Touch", uiType: UiDeviceTypeEnum.ContactSW, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff LED", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "1 Channel", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "4 Channel", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        //{typeName: "Motor C/AC", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        //{typeName: "ElectroDragon", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        //{typeName: "EXS Relay", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        //{typeName: "WiOn", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        { typeName: "Generic", uiType: UiDeviceTypeEnum.Relay, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff Dev", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        //{typeName: "H801", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        { typeName: "Sonoff SC", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff BN-SZ", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff 4CH Pro", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        //{typeName: "Huafan SS", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        { typeName: "Sonoff Bridge", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff B1", uiType: UiDeviceTypeEnum.ColorLight, signalType: [SignalTypeEnum.SonOffLightColor] },
        //{typeName: "AiLight", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        { typeName: "Sonoff T1 1CH", uiType: UiDeviceTypeEnum.ContactSW, signalType: [SignalTypeEnum.Boolean] },
        { typeName: "Sonoff T1 2CH", uiType: UiDeviceTypeEnum.ContactSW2, signalType: [SignalTypeEnum.Boolean, SignalTypeEnum.Boolean] },
        { typeName: "Sonoff T1 3CH", uiType: UiDeviceTypeEnum.ContactSW3, signalType: [SignalTypeEnum.Boolean, SignalTypeEnum.Boolean, SignalTypeEnum.Boolean] },
        // {typeName: "Supla Espablo", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Witty Cloud", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Yunshan Relay", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "MagicHome", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Luani HVIO", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "KMC 70011", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Arilux LC01", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Arilux LC11", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Sonoff Dual R2", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Arilux LC06", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Sonoff S31", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Zengge WF017", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Sonoff Pow R2", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] },
        // {typeName: "Xenon 3CH", uiType: UiDeviceTypeEnum.Unknown, signalType: [SignalTypeEnum.Bolean] }
    ]
}

