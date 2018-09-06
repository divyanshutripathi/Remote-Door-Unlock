import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the SensorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SensorProvider {

  constructor(public http: Http) {
    console.log('Hello SensorProvider Provider');
  }

  getDevices(body){
    let Header = new Headers();
    Header.append("Content-Type","application/json");
    return this.http
    .post("http://18.216.98.10:3000/sensor/getusersensors",body,{headers:Header})
    .map(res=>res.json());
  }

  addDevices(body){
    let Header = new Headers();
    Header.append("Content-Type","application/json");
    return this.http
    .post("http://18.216.98.10:3000/sensor/addDevice",body,{headers:Header})
    .map(res=>res.json());
  }

  checkPass(body){
    let Header = new Headers();
    Header.append("Content-Type","application/json");
    return this.http
    .post("http://18.216.98.10:3000/sensor/checkPass",body,{headers:Header})
    .map(res=>res.json());
  }
  changePass(body){
    let Header = new Headers();
    Header.append("Content-Type","application/json");
    return this.http
    .post("http://18.216.98.10:3000/sensor/changePass",body,{headers:Header})
    .map(res=>res.json());
  }
}

