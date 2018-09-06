import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login'
import { RegisterPage} from '../pages/register/register'
import { UnlockPage} from '../pages/unlock/unlock'
import { AdddataPage} from '../pages/adddata/adddata'
import { ChangepassPage} from '../pages/changepass/changepass'
import { UserProvider } from '../providers/user/user';
import { SensorProvider } from '../providers/sensor/sensor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AdddataPage,
    ChangepassPage,
    UnlockPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AdddataPage,
    ChangepassPage,
    UnlockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SensorProvider
  ]
})
export class AppModule {}
