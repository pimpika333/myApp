import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {IndexPage} from "../pages/index";
import {LoginPage} from "../pages/login/login";
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LoginPage;
  rootPage:any;
  dateTime:any;
  // currentUser:any
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen ,
    authService : AuthServiceProvider,
    public localNotifications: LocalNotifications
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();

    var time = h+":"+m+":"+s;
    var today = year +"-"+month +"-"+ date;
    var dateTime = today+" "+time;

      if (localStorage.getItem('user')!= null && localStorage.getItem('code')!= null){
        this.rootPage = IndexPage;
      }
      else {
        this.rootPage = LoginPage;
      }

      // if(localStorage.getItem('time') == this.dateTime){
      //   this.localNotifications.schedule({
      //     text: 'Delayed ILocalNotification',
      //     trigger: {at: new Date(new Date().getTime() + 3600)},
      //     led: 'FF0000',
      //     sound: null
      //  });
      // }




    });




  }
}

