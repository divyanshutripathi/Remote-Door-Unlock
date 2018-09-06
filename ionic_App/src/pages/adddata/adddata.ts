import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnlockPage} from '../unlock/unlock'
import { SensorProvider} from '../../providers/sensor/sensor'

/**
 * Generated class for the AdddataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adddata',
  templateUrl: 'adddata.html',
})
export class AdddataPage {
username:String
door:String
response:String
password:String
  constructor(public navCtrl: NavController, public navParams: NavParams,private SENSOR: SensorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdddataPage');
  }

  toaddSensor(){
    let body={
      username:this.username,
      password:this.password,
      door:this.door
    }
    this.SENSOR.addDevices(body).subscribe(res=>{
      console.log(res);
      if(res.success){
        //this.USER.storeLocal(JSON.stringify(res.msg));
        this.navCtrl.push(UnlockPage);
      }
      else{
        this.response='this sensor already exist!'
      }
      
    })
  }

}
