import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateProvider } from '../../providers/date/date';
import { Storage } from '@ionic/storage';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateProvider: DateProvider,
    public storage: Storage
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateConferPage');
    this.dateProvider.getDate()
      .then((data: any) => {
        console.log(data);
        this.dateConfer = data;

      });
     // localStorage.dataWeb="";

  }

  goProgram(item) {
    console.log(item);
    this.navCtrl.push(ProgrammePage, {item: item});


  }



}

