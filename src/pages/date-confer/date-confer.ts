import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateProvider } from '../../providers/date/date';
import {ProgrammePage} from "../programme/programme";

/**
 * Generated class for the DateConferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-confer',
  templateUrl: 'date-confer.html',
})
export class DateConferPage {
  dateConfer: any;
  code:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateProvider: DateProvider
  ) {

    this.code = localStorage.getItem('code');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DateConferPage');
    this.dateProvider.getDate(this.code)
      .then((data: any) => {
        // console.log(data);
        this.dateConfer = data;

      });
  }
  goProgram(item) {
    // console.log(item);
    this.navCtrl.push(ProgrammePage, {item: item});
  }

}

