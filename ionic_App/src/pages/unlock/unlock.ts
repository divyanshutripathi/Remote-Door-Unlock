import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorProvider} from '../../providers/sensor/sensor'
import { ChangepassPage} from '../changepass/changepass'
import { AdddataPage} from '../adddata/adddata'
/**
 * Generated class for the UnlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
})
export class UnlockPage {

 username:String
 door:String
 password:String
 response:String
  constructor(public navCtrl: NavController, public navParams: NavParams,private SENSOR:SensorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnlockPage');
  }
  toUnlock(){
    let body={
      username:this.username,
      door:this.door,
      password:this.password
      }
    this.SENSOR.checkPass(body).subscribe(res=>{
      console.log(res);
      if(res.success){
        //this.SENSOR.storeLocal(JSON.stringify(res.msg));
        //this.navCtrl.push(UnlockPage);
        this.response='door has been unlocked.!'
      }
      else{
        this.response='wrong username or password.!'
      }
      
    })
  }

  tochange(){
    this.navCtrl.push(ChangepassPage);
    }

    toadd(){
      this.navCtrl.push(AdddataPage)
    }
  }
  

