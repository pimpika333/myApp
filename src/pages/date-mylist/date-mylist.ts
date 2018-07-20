import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateProvider } from '../../providers/date/date';
import {MylistPage} from "../mylist/mylist";

/**
 * Generated class for the DateMylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-mylist',
  templateUrl: 'date-mylist.html',
})
export class DateMylistPage {
  dateMylist : any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dateProvider: DateProvider,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateMylistPage');

    this.dateProvider.getDate()
      .then((data: any) => {
        console.log(data);
        this.dateMylist = data;

      });
  }
  goMylist(date) {
    console.log(date);
    this.navCtrl.push(MylistPage, {date: date});


  }
}
