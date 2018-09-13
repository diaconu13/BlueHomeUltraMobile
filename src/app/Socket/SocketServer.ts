import { Server } from "http";
import * as express from "express";
import { DeviceSocket } from "../model/device/DeviceSocket";
import * as Pubnub from "pubnub";
import { DeviceController } from "../model/device/DeviceController";

export class SocketServer {
  public  static readonly PORT: number = 8081;
  private app                 : express.Application;
  //public  io                  : SocketIO.Server; 

  private readonly device: DeviceSocket;
  private readonly pubnub: Pubnub;

  constructor(
    app             : express.Application,
    server          : Server,
    deviceController: DeviceController
  ) {
    this.config();
    this.device = new DeviceSocket(deviceController);
    this.app    = app;
    
    this.pubnub = new Pubnub({
      publishKey  : "pub-c-17fcb2d5-85ec-4d16-b1df-45ca7a06be28",
      subscribeKey: "sub-c-17032738-37cb-11e6-a9ba-02ee2ddab7fe"
    });
    this.registerLocalEvents();
  }

  private config(): void {
  }

  // private sockets(): void {
  //   this.io = socketIo(this.server);
  // }

  // private listen(): void {
  //   this.server.listen(this.port, () => {
  //     console.log("Running socket server on port %s", this.port);
  //   });

  //   this.io.on("connect", (socket: socketIo.Socket) => {
  //     console.log("Connected client on port %s.", this.port);
  //     socket.on("message", (m: Command) => {
  //       console.log("[server](message): %s", JSON.stringify(m));

  //       this.io.emit("message", m);
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("Client disconnected");
  //     });
  //     this.registerLocalEvents();
  //   });
  // }

  public getApp(): express.Application {
    return this.app;
  }

  registerLocalEvents(): void {
    this.device.register( this.pubnub);
  }
}
