import {Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { CheckloginProvider } from '../../providers/checklogin/checklogin';
import { ShowyearProvider } from '../../providers/showyear/showyear';
import { ToastController } from 'ionic-angular';
import { IndexPage } from '../index/index';
import{Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  yearList :Array<any>;
  code :string;
  welcome:string;
  public isLoggedIn: Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public checkloginProvider:CheckloginProvider,
              public showyearProvider:ShowyearProvider,
              public toastCtrl: ToastController,
              public storage : Storage
              ) {


  }
  ionViewWillEnter(): void {
    console.log('ionViewDidLoad HomePage');
    this.showyearProvider.getShowyear()
      .then((data: any) => {

        this.yearList = data;
        this.welcome ='Welcome to';
        console.log(data);

      })
  }

  doJoin(position: string) {




    this.checkloginProvider.doLogin(this.code)
      .then((data:any)=> {

        if(data == null){
          let toast = this.toastCtrl.create({
            message: 'Invalid code!!!',
            duration: 2000,
            position: position
          });

          toast.present(toast);

       }
        else{
        console.log(data);

          localStorage.setItem('code', this.code);
          this.navCtrl.setRoot(IndexPage);
          return this.storage.set('code', this.code).then(() => {
            this.isLoggedIn = true;

          });


        }
      });

  }



}
