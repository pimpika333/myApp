import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateProvider } from '../../providers/date/date';
import {MylistPage} from "../mylist/mylist";
@IonicPage()
@Component({
  selector: 'page-date-mylist',
  templateUrl: 'date-mylist.html',
})
export class DateMylistPage {
  dateMylist : any;
  code:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dateProvider: DateProvider,
              ) {
    this.code = localStorage.getItem('code');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DateMylistPage');

    this.dateProvider.getDate(this.code)
      .then((data: any) => {
        // console.log(data);
        this.dateMylist = data;

      });
  }
  goMylist(date) {
    // console.log(date);
    this.navCtrl.push(MylistPage, {date: date});
  }
}
