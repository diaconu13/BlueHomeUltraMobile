import { Controller } from "../../lib/controller";
import { MqttService } from "../../services/mqttService";
import { NextFunction, Request, Response } from "express";
import { Config } from "../../config/bhconfig";
import { IDevice, Device } from "./Device";
import DeviceFacade from "./DeviceFacade";
import { DeviceRegisterMap } from "../../convertors/DeviceRegisterMap";
import _ from "underscore";
import { DevicesConfigS20Socket } from "../../config/DevicesConfigS20Socket";
import { DevicesConfigBase } from "../../config/DevicesConfigBase";
import { State } from "../serviceModels/models";
import { Command } from "../commands/Command";
import { DevicesConfigSonoffT12CH } from "../../config/DevicesConfigSonoffT12CH";
import { DevicesConfigBHGate } from "../../config/DevicesConfigBHGate";
import { DevicesConfigSonoffTH } from "../../config/DevicesConfigSonoffTH";
import { GateStateEnum } from "../../convertors/GateStateEnum";
import { Query } from "mongoose";
import { DevicesConfigSonoff4CH } from "../../config/DevicesConfigSonoff4CH";

/**
 *
 *
 * @export
 * @class DeviceController
 * @extends {Controller}
 */
export class DeviceController extends Controller {
  public mqttService    : MqttService;
  public facade         : DeviceFacade;
        // scheduleService: SchedulerService;
         doNotInitialize: boolean;

  constructor(doNotInitialize: boolean) {
    const facade: DeviceFacade = new DeviceFacade();

    super(facade);

    this.facade          = facade;
    this.mqttService     = new MqttService(new Config(), this, doNotInitialize);
    //this.scheduleService = new SchedulerService();
    // if (!doNotInitialize) {
    //   this.scheduleService.Init(this.mqttService);
    // }

    console.log("DeviceController instantiated");
    this.doNotInitialize = doNotInitialize;
  }

  /**
   * This just publishes the intent to change the device state
   * After the state is changed and RESULT is received, DB item will be changed
   * @param req
   * @param res
   * @param next
   */
  public setCommand(req: Request, res: Response, next: NextFunction): void {
    // console.log("DeviceController.setCommand ->", req.body);
    this.facade.findOne({ _id: req.body._id }).then((device: IDevice) => {
      // console.log("setCommand -> ", device);

      this.mqttService.setCommand(device, req.body.command as Command);
      res.status(200).send({
        message: "command posted to mqtt for " + device.name + " " + device.ip
      });
    });
  }
  getSchedule(req: Request, res: Response, next: NextFunction): any {
    this.facade.findById(req.params.id).then((device: IDevice) => {
      if (!device) {
        return res.sendStatus(404);
      }
      return res.status(200).json(device.schedule);
    });
  }



  convertValue(model: string, value: any): any {
    if (typeof value === "number" && model === "S20 Socket") {
      if (value === 0) {
        return "OFF";
      } else {
        return "ON";
      }
    }
  }

  setOnlineState(device: Device, state: Boolean): any {
    // device.isOnline = state;
    // console.log("set device " + device.name + " isOnline:" + state);
    return this.facade.Model.update({ _id: device._id }, { isOnline: state });
  }

  /**
   * convert typename to a domain Device
   * @param devMap
   */
  getDeviceConfig(module: String): DevicesConfigBase {
    switch (module) {
      case "S20 Socket": 
        return new DevicesConfigS20Socket();
      case "Sonoff T1 2CH": 
        return new DevicesConfigSonoffT12CH();
      case "Sonoff 4CH": 
        return new DevicesConfigSonoff4CH();
      case "Sonoff TH": 
        return new DevicesConfigSonoffTH(); 
      case "BH Gate": 
        return new DevicesConfigBHGate();
      default: 
        return;
    }
  }

  static find(
    req : Request,
    res : Response,
    next: NextFunction
    )   : Promise<Device[]> | Promise<void> {
    // console.log("DeviceController js test 2 s");
    return this.find(req, res, next);
  }

  private deviceSort(d1: IDevice, d2: IDevice): number {
    return d1.signals.length - d2.signals.length;
  }

  public findAll(
    req : Request,
    res : Response,
    next: NextFunction
    )   : Promise<void | Response> {
    console.log("DeviceController js");
    return this.facade
      .find(req.query)
      .then((collection: IDevice[]) => {
        collection = collection.sort(this.deviceSort);
        return res.status(200).json(collection);
      })
      .catch(err => next(err));
  }

  public getAll(): Promise<Device[]> {
    return this.facade
      .find()
      .then((collection: IDevice[]) => {
        return collection.sort((d1, d2) => {
          return d1.signals.length - d2.signals.length;
        });
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  public getByIp(ip: string): Promise<Device> {
    return this.facade
      .findOne({ ip: ip })
      .then((doc: IDevice) => {
        return doc;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  public getByMac(mac: string): Promise<Device> {
    return this.facade
      .findOne({ mac: mac })
      .then((doc: IDevice) => {
        return doc;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  public updateInternal(doc: IDevice): Query<any> {
    // {_id: "2oBkjqYFwf3vrgDj4", "titles.titleText": "i am an album"},
    // {$set:{"titles.titleText": "i am not an album"}}
    return this.facade.update({ _id: doc._id }, doc);
  }

  deleteDevice(req: Request, res: Response, next: NextFunction): any {
    if (req.body && req.body.id) {
      this.facade.Model.remove({ _id: req.body.id }, next);
      res.status(200).json("OK");
      return;
    }

    res.sendStatus(404);
  }

  public registerDevice(
    req : Request,
    res : Response,
    next: NextFunction
    )   : Promise<void | Response> {
    const devMap: DeviceRegisterMap = new DeviceRegisterMap(
      "",
      req.body.mac,
      req.body.typeName,
      req.body.name,
      req.body.icon,
      req.body.isCustomIcon
    );
    if (!devMap.mac) {
      console.error("mo mac present on registration");
    }
    return this.facade
      .findOne({ mac: devMap.mac })
      .then((doc: IDevice) => {
        if (doc) {
          // if exists set device to inactive or else?, todo
          super.updateInternal(
            { _id: doc.id },
            {
              typeName    : devMap.typeName ? devMap.typeName: doc.module,
              name        : devMap.name ? devMap.name        : doc.name,
              icon        : devMap.icon ? devMap.icon        : doc.icon,
              isCustomIcon: devMap.isCustomIcon
                ? devMap.isCustomIcon
                :   doc.isCustomIcon
            }
          );
          return this.facade
            .findOne({ _id: doc.id })
            .then((device: IDevice) => {
              this.mqttService.subscribeToUnregisteredDevice(device);
              res.status(200).json(device);
            });
          // .then(results => {
          //   if (results.n < 1) {
          //     return res.sendStatus(404);
          //   }
          //   if (results.nModified < 1) {
          //     //this.mqttService.subscribeToUnregisterdDevice(doc);//just for test
          //     return res.sendStatus(304);
          //   }

          // return updated device

          // });
        } else {
          const device: Device = this.convertDevice(devMap);
          return this.facade
            .create(device)
            .then((device: IDevice) => {
              this.mqttService.subscribeToUnregisteredDevice(device);
              // ! dummy update to trigger save and update the UI
              super.updateInternal({ _id: device._id }, { name: device.name });
              return res.status(201).json(device);
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
  //  not used
  //   public updateInfoEvent(mac: string, data: any): void {
  //     this.getByMac(mac).then((device: IDevice) => {
  //       device.restartReason = data.RestartReason;
  //       this.updateInternal(device);
  //     });
  //   }

  // public updateInfoWeb(deviceIp:string, data:any): void {
  //   // tslint:disable-next-line:no-console
  //   console.info("got data on info 1 from " + deviceIp);
  //   this.getByIp(deviceIp).then((device: IDevice) => {
  //     device.module          = data.Module;
  //     device.softwareVersion = data.Version;
  //     this.updateInternal(device).then(dev => {
  //       // console.log("updated :", dev);
  //     });
  //   });
  // }

  /**
   * possible loads
   * {"Time":"2018-07-14T07:59:51","Uptime":"6T22:45:37","Vcc":3.186,"POWER":"OFF","Wifi":{"AP":1,"SSId":"Dan Home","RSSI":100,"APMac":"9C:5C:8E:47:9E:08"}}
   * {"POWER":"ON"}
   * @param device
   * @param _data
   */
  public updateDeviceSignal(device: Device, _data: State): void {
    console.log("updateDeviceSignal", device, _data);

    const this_: DeviceController = this;
    return device.signals.forEach(ds => {
      var result: Object = _.pick(_data, ds.name);

      if (result) {
        var val: any = result[ds.name.toString()];

        if (val === undefined) {
          return;
        }

        switch (ds.name) {
          case "GATE": 
            switch (val) {
              case "FULLY_OPENED": 
                ds.value = GateStateEnum.FullyOpened;
                break;
              case "FULLY_CLOSED": 
                ds.value = GateStateEnum.FullyClosed;
                break;
              case "UNDEFINED": 
                ds.value = GateStateEnum.Undeffined;
                break;
            }
            break;
          default: 
            if (val && val === "ON") {
              ds.value = 1;
            } else if (val && val === "OFF") {
              ds.value = 0;
            } else {
              ds.value = val;
            }
            break;
        }

        // console.log('updating device ', device.name, device.ip, ds.name, ds.value)
        this_.facade.update(
          { _id: device._id, "signals.name": ds.name },
          { $set: { "signals.$.value": ds.value } }
        );
      }
    });
    // return this.facade.update({ _id: device._id }, device)
  }

  /**
   * convert typename to a domain Device
   * @param devMap
   */
  convertDevice(devMap: DeviceRegisterMap): Device {
    const device: Device = new Device();
    let   config: DevicesConfigBase;

    switch (devMap.typeName) {
      case "S20 Socket": 
        config             = new DevicesConfigS20Socket();
        device.createdDate = new Date();
        this.createDevice(device, devMap, config);
        break;

      // do some logic here to transform the map into device and signals
      case "Sonoff T1 2CH": 
        config = new DevicesConfigSonoffT12CH();
        this.createDevice(device, devMap, config);
        break;
      case "Sonoff 4CH": 
        config = new DevicesConfigSonoff4CH();
        this.createDevice(device, devMap, config);
        break;

      case "Sonoff TH": 
        config = new DevicesConfigSonoffTH();
        this.createDevice(device, devMap, config);
        break;

      case "BH Gate": 
        config = new DevicesConfigBHGate();
        this.createDevice(device, devMap, config);
        break;
      default: 
        return;
    }

    return device;
  }

  private createDevice(
    device: Device,
    devMap: DeviceRegisterMap,
    config: DevicesConfigBase
    )     : void {
    device.createdDate    = new Date();
    device.name           = devMap.name ? devMap.name : undefined;
    device.ip             = devMap.ip;
    device.module         = devMap.typeName ? devMap.typeName : undefined;
    device.icon           = devMap.icon ? devMap.icon : undefined;
    device.isCustomIcon   = devMap.isCustomIcon ? devMap.isCustomIcon : undefined;
    device.signals        = config.signals;
    device.isActive       = false;
    device.isOnline       = false;
    device.mac            = devMap.mac;
    device.isRegistered   = true;
    device.uptime         = undefined;
    device.uiDeviceType   = config.uiType;
    device.registeredDate = new Date();
    device.restartReason  = "";
  }
}
