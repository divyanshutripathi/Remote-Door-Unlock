import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorProvider} from '../../providers/sensor/sensor'
import { UnlockPage} from '../unlock/unlock'
/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  username:String
  password:String
  newpassword:String
  response:String
  door:String
  constructor(public navCtrl: NavController, public navParams: NavParams,private SENSOR: SensorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  toChange(){
    let body={
      username:this.username,
      password:this.password,
      door:this.door,
      newpassword:this.newpassword
    }
    this.SENSOR.changePass(body).subscribe(res=>{
      console.log(res);
      if(res.success){
        //this.USER.storeLocal(JSON.stringify(res.msg));
        this.navCtrl.push(UnlockPage);
      }
      else{
        this.response=res.msg
      }
      
    })
  }

}
