import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowyearProvider } from '../../providers/showyear/showyear';
import { HomePage } from '../home/home';
import {IndexPage} from "../index";
/**
 * Generated class for the ShowyearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showyear',
  templateUrl: 'showyear.html',
})
export class ShowyearPage {
  yearList : any;
  year: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public showyearProvider:ShowyearProvider
    ) {
    this.year = navParams.data.year;
  }

  goHome(year) {
    this.navCtrl.push(HomePage, {year: year});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowyearPage');

    this.showyearProvider.getShowyear()
      .then((data: any) => {

        this.yearList = data;
        console.log(data);

      })

  }



    // this.showyearProvider.checkYear(this.year)
    //
    //   .then((data: any) => {
    //     if (data == null) {
    //       alert(JSON.stringify("can't join"));
    //       this.navCtrl.push(HomePage,{year:year});
    //     }
    //     else {
    //
    //       console.log(data);
    //       alert(JSON.stringify(data));
    //       this.navCtrl.push(HomePage,{year:year});
    //     }
    //
    //   });





}
