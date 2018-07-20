import { Component } from '@angular/core';
import { IonicPage, NavController,ItemSliding,NavParams,LoadingController ,AlertController} from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { DetailprogrammePage} from '../detailprogramme/detailprogramme';
import { Events } from "ionic-angular";
import { Storage } from '@ionic/storage';
import {FavProvider} from "../../providers/fav/fav";
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-programme',
  templateUrl: 'programme.html',
})

export class ProgrammePage {
  timeAco :string[] = [];
  check:boolean;
  favorites: Array<any>;
  date: any;
  today : any;
  month :any;
  year:any;
  time :any;
  id:any;

  fav_aco :any;
  fav_paper :any;
  Session :Array<any>;
  activityList:Array<any>;
  dateAc: any;
  activityPaper:any;
  activityOther:any;
  person:any;
  session:any;

  sessionName:Array<any>;
  all:any='All Session';
  count : any;
  enable:boolean;
  public item:any;
  public list :any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public activityProvider: ActivityProvider,
    private storage: Storage,
    private events:Events,
    public loadingCtrl : LoadingController,
    public fav : FavProvider,
    public toastCtrl: ToastController,
    public alertCtrl:AlertController,
    public localNotifications: LocalNotifications
    ) {
    this.favorites = [];
    this.dateAc = this.navParams.get('item');
    this.id = localStorage.getItem('User id');
    // this.isFavorite = this.favorite_aco()


    this.date = new Date().getDate();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.today = this.year +"-"+this.month +"-"+ this.date;

    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    this.time = h+":"+m+":"+s;
    console.log("time is:",this.time);
    console.log("to day is:",this.today);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgrammePage');

    this.activityProvider.getActivity()
      .then((data: any) => {
        // console.log(data);
        this.activityList = data;
        let newValue = new Date().toISOString();
        return newValue;
      })
    // console.log('ACO');
    this.activityProvider.getAco()
      .then((data: any) => {
        // console.log(data);
        this.activityOther = data;

        console.log("ACO :",this.activityOther);
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

    // console.log('show like aco');
    this.fav.show_FavAco().then((data: any) => {

      this.fav_aco = data;

    })

    this.fav.show_FavPaper().then((data: any) => {

      this.fav_paper = data;
      console.log("Like paper" ,this.fav_paper);
    })


  }


goDetail(Paper,item){

    this.navCtrl.push(DetailprogrammePage,{Paper:Paper,item:item})
    console.log('DETAIL')
    console.log(Paper);

  }

  goDetailOther(item){
    this.navCtrl.push(DetailprogrammePage,{other:item})
  }

  Timeout(position: string){
    let toast = this.toastCtrl.create({
      message: 'Time Out!!!',
      duration: 2000,
      position: position
    });

    toast.present(toast);
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
            console.log("can't like");

          }
          else {

            let alert = this.alertCtrl.create({
              title: 'Favorite Added',
              buttons: [{
                text: 'OK',
                handler: () => {
                  // close the sliding item
                  slidingItem.close();
//-----------------------------------------------storage time notification---------------------------------------------------
                  if(localStorage.time){
                    if( localStorage.getItem('time') != null ){
                      // this.timeAco.push(item.aco_s_time);
                      console.log("TimeAco",this.timeAco);
                      console.log(localStorage.getItem('time'));
                    }
                    // var showDatas = JSON.parse("[" + localStorage.time + "]");
                    // var lengthData=showDatas.length;
                    var date = item.date_day;
                    var time = item.aco_s_time;
                    var dateTime = date +" "+ time;
                    console.log("datetime",dateTime);
                    localStorage.time+=","+JSON.stringify(dateTime);
                  
                  
                    // this.begin =lengthData;
                  }else{
                    var date = item.date_day;
                    var time = item.aco_s_time;
                    var dateTime = date +" "+ time;
                    localStorage.time=JSON.stringify(dateTime);
                    // this.begin=0;
                    this.timeAco.push(item.aco_s_time);
                    console.log("TimeAco",this.timeAco);

                    this.localNotifications.schedule({
                      text: 'Delayed ILocalNotification',
                      trigger: {at: new Date(new Date().getTime() + 3600)},
                      led: 'FF0000',
                      sound: null
                   });
                
                  }
                 
                 
//--------------------------------------------------------------------------------------------------------------------

                }
              }]
            });
            alert.present();
        
          }
        });
    }
  }

  favorite_Paper(slidingItem: ItemSliding,Paper) {

      this.fav.favoritePaper(Paper.paper_id, this.id)
        .then((data: any) => {

          if (data == null) {
            console.log("can't like");

          }
          else {
            console.log("like!!!");
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

  isSelected(event) {
    console.log(event);
    return 'danger';
    // event.target.getAttribute('selected') ? 'primary' : '';
  }


  selectSession(){
    if(this.sessionName==this.all){
      console.log("ALL");
    }
    else if(this.sessionName==this.sessionName){
      this.sessionName = this.sessionName;
    }
  }


}
