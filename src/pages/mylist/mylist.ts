import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Events } from "ionic-angular";
import {Storage} from "@ionic/storage";
import {FavProvider} from "../../providers/fav/fav";
import { ActivityProvider } from '../../providers/activity/activity';
import { DateProvider } from '../../providers/date/date';
/**
 * Generated class for the MylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  all:any='All Session';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public storage : Storage,
    public fav : FavProvider,
    public activityProvider: ActivityProvider,
    public alertCtrl:AlertController

  ) {

    this.dateMylist = this.navParams.get('date');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MylistPage');
    this.fav.show_FavAco()
      .then((data: any) => {
        console.log(data);
        this.Fav_aco = data;

      });

    this.fav.show_FavPaper()
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


  likeOther(item,ionicButton) {
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
            if(ionicButton._color === 'danger')

              this.fav.unfavorite(item.aco_id)
                .then((data:any)=> {

                  if(data == null){
                    console.log("can't unlike");

                  }
                  else{
                    ionicButton.color = 'light';


                  }
                });
          }
        }
      ]
    });
    prompt.present();


  }

  likePaper(paper,ionicButton) {

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
            if(ionicButton._color === 'danger')

              this.fav.unfavoritePaper(paper.paper_id)
                .then((data:any)=> {

                  if(data == null){
                    console.log("can't unlike");

                  }
                  else{
                    ionicButton.color = 'light';


                  }
                });

          }
        }
      ]
    });
    prompt.present();

  }
}
