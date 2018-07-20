///<reference path="../../providers/activity/activity.ts"/>

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';

/**
 * Generated class for the SelectsessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectsession',
  templateUrl: 'selectsession.html',
})
export class SelectsessionPage {
  sessionName:Array<any>;
  dateAc:Array<any>;
  Session :Array<any>;
  activityList:any;

  activityPaper:any;
  activityOther:any;
  person:any;
  session:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public activityProvider: ActivityProvider,) {
    this.sessionName = this.navParams.get('itemSession');
    // this.dateAc = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectsessionPage');

    this.activityProvider.getActivity()
      .then((data: any) => {
        console.log(data);
        this.activityList = data;

      })
    console.log('ACO');
    this.activityProvider.getAco()
      .then((data: any) => {
        console.log(data);
        this.activityOther = data;

      })

    console.log('Paper');
    this.activityProvider.getPaper()
      .then((data: any) => {
        console.log(data);
        this.activityPaper = data;

      })


    console.log('Person');
    this.activityProvider.getPerson()
      .then((data: any) => {
        console.log(data);
        this.person = data;

      })

    console.log('Session');
    this.activityProvider.getsession()
      .then((data: any) => {
        console.log(data);
        this.session = data;

      })
  }

}
