import { EventEmitter } from "events";
import { Document, Model } from "mongoose";
import * as triggers from "mongo-triggers";
import DeviceFacade from "./DeviceFacade";
// import * as socketIo from "socket.io";
import { DeviceController } from "./DeviceController";
import * as Pubnub from "pubnub";
import { Device } from "./Device";

export class DeviceSocket {
  //DevicesEvents: EventEmitter;
  events       : string[];
  schema       : Model<Document>;
  //socket       : socketIo.Socket;
  pubnub       : Pubnub;

  // model events to emit
  constructor(private deviceController: DeviceController) {
    // tslint:disable-next-line:no-console
    console.info("initializing socket events ctr");

    this.events        = ["save", "remove"];
    //this.DevicesEvents = new EventEmitter();
    this.schema        = new DeviceFacade().Model;

    this.addDBTriggers();
  }

  register( pubnub: Pubnub): void {
   // this.socket = socket;
    this.pubnub = pubnub;
    // bind model events to socket events
    for (
      var i: number = 0, eventsLength: number = this.events.length;
      i < eventsLength;
      i++
    ) {
      var event: string                     = this.events[i];
      // var listener: (doc: Document) => void = this.createListener(
      //   "devices:" + event,
      //   socket
      // );

      pubnub.subscribe({
        channels: ["devices"]
      });

     //this.DevicesEvents.on(event, undefined);
      // socket.on("disconnect", this.removeListener(event, listener));
    }
    let this_ = this;
    pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
        }
      },
      message: function(msg) {
        if (msg.channel == "online_clients") {
          this_.deviceController.getAll().then((d: Device[]) => {
            this_.publishToPubNub("devices:save", d);
          });
        }
      },
      presence: function(presenceEvent) {
        // handle presence
      }
    });
    // this.pubnub.subscribe({
    //   channels: ["online_clients"]
    // });
  }

  // createListener(
  //   event : string,
  //   socket: socketIo.Socket
  //   )     : (doc: Document) => void {
  //   return function(doc: Document): void {
  //     socket.emit(event, doc);
  //   };
  // }

  // removeListener(
  //   event   : string,
  //   listener: (doc: Document) => void
  //   )       : (doc: Document) => void {
  //   let    this_     : DeviceSocket = this;
  //   return function(): void {
  //     this_.DevicesEvents.removeListener(event, listener);
  //   };
  // }

  private addDBTriggers(): void {
    this.addDBTrigger("save");
    this.addDBTrigger("insert");
    this.addDBTrigger("update");
    this.addDBTrigger("remove");
  }

  addDBTrigger(trigger: string): void {
    const this_: DeviceSocket = this;

    const devices:string = "devices";
    // tslint:disable-next-line:comment-format
    //https://www.npmjs.com/package/mongo-triggers
    // tslint:disable-next-line:typedef
    triggers(this.schema).on(trigger, function(error, result, q, update) {
      console.log(
        "device " + trigger + " triggered! " + trigger,
        error,
        q,
        update,
        result
      );
      // error   : null (unless something went wrong)
      // result  : { ... } (in case of the save command, this will be a lastErrorObject)
      // query   : { _id: "foo" }
      // update  : { name: "Anders" }
      // options : undefined (since no options object was passed to the update function)

      if (trigger === "remove") {
        const channel:string = devices + ":" + trigger;
       // this_.socket.emit(channel, q);
        console.log("done devices:" + trigger + q);
        if (result.nModified !== 0) {
          this_.publishToPubNub(channel, q);
        }
      } else {
        this_.deviceController.findInternal(q).then(device => {
         // this_.socket.emit("devices:save", device);
          console.log("done devices:" + trigger + q, device);
          // if(result.nModified!==0){
          this_.publishToPubNub("devices:save", device);
          //}
        });
      }
    });
  }

  private publishToPubNub(channel: string, q: any) {
    
    let publishConfig = {
      channel: channel,
      message: q
    };
    this.pubnub.publish(publishConfig, function(status, response) {
      console.log(status, response);
    });
  }
}
