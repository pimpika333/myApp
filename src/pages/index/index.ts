import { Component } from '@angular/core';
import {IonicPage, NavController, App, NavParams, LoadingController, Refresher} from 'ionic-angular';
import { ConferenceProvider } from '../../providers/conference/conference';
import {DateConferPage} from "../date-confer/date-confer";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {DateMylistPage} from "../date-mylist/date-mylist";
import{Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  dataList: any;
  detailConfer: string;
  kst:string;
  code:any;

  yearList :Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conferenceProvider: ConferenceProvider,
    public loadingCtrl : LoadingController,
    public  app :App,
    public storage : Storage,
    public authService : AuthServiceProvider
  ) {
    this.yearList = this.navParams.get('yearList');
    this.code = localStorage.getItem('code');
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad IndexPage');
    let loading = this.loadingCtrl.create({
      content:'Loading...',
      spinner:'circles'
    });
    loading.present();

    this.conferenceProvider.getConference(this.code)
      .then((data: any) => {
        loading.dismiss();

        this.dataList = data;
        this.detailConfer = 'Organized by KST Research Lab, Faculty of Informatics, Burapha University, Chonburi, Thailand';
        this.kst ='International Conference on Knowledge and Smart Technology (KST) '
      })

  }

  goDate(){
    this.navCtrl.push(DateConferPage)
  }
  goDateMyList(){
    this.navCtrl.push(DateMylistPage)
  }

  logout() {
    this.authService.Dologout();
    localStorage.removeItem('user');
    localStorage.removeItem('code');
    localStorage.removeItem('User id');
    localStorage.removeItem('dataWeb');
    localStorage.removeItem('like');
    localStorage.removeItem('Likepaper');
    // this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
    let loading = this.loadingCtrl.create({
      content:'Please wait...',
      spinner:'circles'
    });
    loading.present();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    loading.dismiss();
  }

  doRefresh(refresher: Refresher) {
    this.conferenceProvider.getConference(this.code)
      .then((data: any) => {

        this.dataList = data;
        this.detailConfer = 'Organized by KST Research Lab, Faculty of Informatics, Burapha University, Chonburi, Thailand';
        this.kst ='International Conference on Knowledge and Smart Technology (KST)'

        setTimeout(() => {
          refresher.complete();
        }, 500);
      })

  }

}

