import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Space } from "../../app/model/spaces/Space";
import { DevicesPage } from "../devices/devices";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  spaces: Space[]; 

  constructor(public navCtrl: NavController) {

    this.spaces = [
      new Space("Home", "ios-home-outline",1),
      new Space("Living", "ios-easel-outline",3)
    ];
    
  } 
  gotoSpaceDevices(name:string){
    this.navCtrl.push(DevicesPage,{'space':name});
  }
}