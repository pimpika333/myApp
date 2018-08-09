import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,ItemSliding,Refresher,LoadingController} from 'ionic-angular';
import { Events } from "ionic-angular";
import {Storage} from "@ionic/storage";
import {FavProvider} from "../../providers/fav/fav";
import { ActivityProvider } from '../../providers/activity/activity';
import {DetailprogrammePage} from "../detailprogramme/detailprogramme";

@IonicPage()
@Component({
  selector: 'page-mylist',
  templateUrl: 'mylist.html',
})
export class MylistPage {
  sessionName:Array<any>;
  dateMylist :any;
  Fav_aco: any;
  Fav_paper:any;
  check : any;
  date: any;
  activityOther:any;
  activityPaper:any;
  activity:any;
  session :any;
  id:any;
  all:any='All Session';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public storage : Storage,
    public fav : FavProvider,
    public activityProvider: ActivityProvider,
    public alertCtrl:AlertController,
    public loadingCtrl : LoadingController

  ) {
    this.id = localStorage.getItem('User id');
    this.dateMylist = this.navParams.get('date');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MylistPage');
    this.fav.show_FavAco(this.id)
      .then((data: any) => {
        console.log(data);
        this.Fav_aco = data;

      });

    this.fav.show_FavPaper(this.id)
      .then((data: any) => {
        console.log(data);
        this.Fav_paper = data;

      });

    this.activityProvider.getAco()
      .then((data: any) => {
        console.log(data);
        this.activityOther = data;

      })


    this.activityProvider.getPaper()
      .then((data: any) => {
        console.log("paper",data);
        this.activityPaper = data;

      })

    this.activityProvider.getsession()
      .then((data: any) => {
        this.session = data;

      })
    this.activityProvider.getActivity()
      .then((data: any) => {
        this.activity = data;
        console.log("ACTIVITY",this.activity);

      })


  }

  selectSession(){
    if(this.sessionName==this.all){
      console.log("ALL");
    }
    else if(this.sessionName==this.sessionName){
      this.sessionName = this.sessionName;
    }
  }

  likeOther(slidingItem: ItemSliding,item) {
    let prompt = this.alertCtrl.create({
      title: 'Confirm delete',
      message: "Would you like to remove this program from your favorites?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {

              this.fav.unfavorite(item.aco_id)
                .then((data:any)=> {

                  if(data == null){
                    console.log("can't unlike");

                  }
                  else{
                    console.log("unlike");

                    let loading = this.loadingCtrl.create({
                      content:'Loading...',
                      spinner:'circles'
                    });
                    loading.present();
                    slidingItem.close();
                    loading.dismiss();
                    this.fav.show_FavAco(this.id)
                      .then((data: any) => {
                        this.Fav_aco = data;
                      });

                  }
                });
          }
        }
      ]
    });
    prompt.present();
  }

  doRefresh(refresher: Refresher) {
    this.fav.show_FavAco(this.id)
      .then((data: any) => {
        this.Fav_aco = data;
      setTimeout(() => {
        refresher.complete();

      }, 500);
    });
  }


  likePaper(slidingItem: ItemSliding,paper) {

    let prompt = this.alertCtrl.create({
      title: 'Confirm delete',
      message: "Would you like to remove this program from your favorites?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Ok',
          handler: data => {


              this.fav.unfavoritePaper(paper.paper_id)
                .then((data:any)=> {

                  if(data == null){
                    console.log("can't unlike");

                  }
                  else{
                    console.log("unlike");
                    let loading = this.loadingCtrl.create({
                      content:'Loading...',
                      spinner:'circles'
                    });
                    loading.present();
                    slidingItem.close();
                    loading.dismiss();
                    this.fav.show_FavPaper(this.id)
                      .then((data: any) => {
                        this.Fav_paper = data;
                      });

                  }
                });

          }
        }
      ]
    });
    prompt.present();

  }

  goDetail(paper,Activity){
    this.navCtrl.push(DetailprogrammePage,{Paper:paper,item:Activity})
  }



}
