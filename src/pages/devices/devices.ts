import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DeviceController } from "../../app/model/device/DeviceController";

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-devices",
  templateUrl: "devices.html"
})
export class DevicesPage {
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get("space");
    if(!this.title){
      this.title = "All"; 
    }

  }

  ionViewDidLoad() { 
    console.log("ionViewDidLoad DevicesPage");
  }
}
