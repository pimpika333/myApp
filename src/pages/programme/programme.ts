import { Component } from '@angular/core';
import { IonicPage, NavController,ItemSliding,NavParams,AlertController,Refresher} from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { DetailprogrammePage} from '../detailprogramme/detailprogramme';
import {FavProvider} from "../../providers/fav/fav";
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-programme',
  templateUrl: 'programme.html',
})
export class ProgrammePage {
  favorites: Array<any>;
  today : any;
  time :any;
  id:any;
  fav_aco :any;
  fav_paper :any;
  activityList:Array<any>;
  dateAc: any;
  activityPaper:any;
  activityOther:any;
  person:any;
  session:any;
  sessionName:Array<any>;
  all:any='All Session';



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public activityProvider: ActivityProvider,
    public fav : FavProvider,
    public toastCtrl: ToastController,
    public alertCtrl:AlertController,
    public localNotifications: LocalNotifications
    ) {
    this.favorites = [];
    this.dateAc = this.navParams.get('item');
    this.id = localStorage.getItem('User id');



    this.today =  moment().format('YYYY-MM-DD');
    this.time = moment().format('HH:mm:ss');
    console.log("time is:",this.time);
    console.log("today",this.today);


  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProgrammePage');

    this.activityProvider.getActivity()
      .then((data: any) => {
        this.activityList = data;
        let newValue = new Date().toISOString();
        return newValue;
      })
    this.activityProvider.getAco()
      .then((data: any) => {
        this.activityOther = data;

      })
    // console.log('Paper');
    this.activityProvider.getPaper()
      .then((data: any) => {
        this.activityPaper = data;
      })
    // console.log('Person');
    this.activityProvider.getPerson()
      .then((data: any) => {
        this.person = data;
      })
    // console.log('Session');
    this.activityProvider.getsession()
      .then((data: any) => {
        this.session = data;
      })
    this.fav.show_FavAco(this.id).then((data: any) => {
      this.fav_aco = data;
      })
    this.fav.show_FavPaper(this.id).then((data: any) => {
      this.fav_paper = data;
      // console.log("Like paper" ,this.fav_paper);
    })
  }

goDetail(Paper,item){
    this.navCtrl.push(DetailprogrammePage,{Paper:Paper,item:item})
  }

  goDetailOther(item){
    this.navCtrl.push(DetailprogrammePage,{other:item})
  }

  Timeout(slidingItem: ItemSliding,position: string){
    let toast = this.toastCtrl.create({
      message: 'This Event Started',
      duration: 2000,
      position: position
    });

    toast.present(toast);
    slidingItem.close();
  }
  favorite_aco(slidingItem: ItemSliding,item){
    if (this.fav.hasFavorite(item.aco_id)) {
      let alert = this.alertCtrl.create({
        title: 'Favorite already added',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });
      alert.present();

    }
    else {
      this.fav.favorite(item.aco_id, this.id)

        .then((data: any) => {

          if (data == null) {
            // console.log("can't like");
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Favorite Added',
              buttons: [{
                text: 'OK',
                handler: () => {
                  // close the sliding item
                  slidingItem.close();
                }
              }]
            });
            alert.present();
          }
        });
    }
  }
  favorite_Paper(slidingItem: ItemSliding,Paper) {
    if (this.fav.hasFavPaper(Paper.paper_id)) {
      let alert = this.alertCtrl.create({
        title: 'Favorite already added',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });
      alert.present();
    }
    else {
      this.fav.favoritePaper(Paper.paper_id, this.id)
        .then((data: any) => {

          if (data == null) {
            // console.log("can't like");

          }
          else {
            // console.log("like!!!");
            let alert = this.alertCtrl.create({
              title: 'Favorite Added',
              buttons: [{
                text: 'OK',
                handler: () => {
                  slidingItem.close();
                }
              }]
            });
            alert.present();
          }

        });
    }
  }

  selectSession(){
    if(this.sessionName==this.all){
      // console.log("ALL");
    }
    else if(this.sessionName==this.sessionName){
      this.sessionName = this.sessionName;
    }
  }

  doRefresh(refresher: Refresher) {
    this.activityProvider.getActivity()
      .then((data: any) => {
        this.activityList = data;
        let newValue = new Date().toISOString();
        return newValue;
      })
    this.activityProvider.getAco()
      .then((data: any) => {
        this.activityOther = data;
      })
    this.activityProvider.getPaper()
      .then((data: any) => {
        this.activityPaper = data;
      })
    this.activityProvider.getPerson()
      .then((data: any) => {
        this.person = data;
      })
    this.activityProvider.getsession()
      .then((data: any) => {
        this.session = data;
      })
    this.fav.show_FavAco(this.id).then((data: any) => {
      this.fav_aco = data;
    })
    this.fav.show_FavPaper(this.id).then((data: any) => {
      this.fav_paper = data;
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }

}
