import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import {MylistPage} from "../mylist/mylist";
import {FavProvider} from "../../providers/fav/fav";

/**
 * Generated class for the DetailprogrammePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailprogramme',
  templateUrl: 'detailprogramme.html',
})
export class DetailprogrammePage {
    check :boolean;
    favorate: boolean= false;


  detailAC: Array<any>;
  detailPaper: Array<any>;
  detailOther:Array<any>;
  id:any;
  activityPaper:any;
  activityOther:any;
  person:any;
  person_status:any;
  showFavOther:any;
  speaker:any;
  showFavPaper:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public activityProvider: ActivityProvider,
    public fav:FavProvider
  ) {

    // this.favorate = this.check;

    this.id = localStorage.getItem('User id');
    this.detailOther = this.navParams.get('other');
    this.detailAC = this.navParams.get('item');
    this.detailPaper = this.navParams.get('Paper');


  }

  ionViewDidLoad() {
    console.log("ac",this.detailAC);
    console.log("paper",this.detailPaper);
    console.log("other",this.detailOther);
    console.log('ionViewDidLoad DetailprogrammePage');
    console.log('ACO');
    this.activityProvider.getAco()
      .then((data: any) => {
        // console.log(data);
        this.activityOther = data;

      })

    console.log('Paper');
    this.activityProvider.getPaper()
      .then((data: any) => {
        // console.log(data);
        this.activityPaper = data;

      })


    console.log('Person');
    this.activityProvider.getPerson()
      .then((data: any) => {
        // console.log(data);
        this.person = data;

      })

    console.log('person status');
    this.activityProvider.getperStatus()
      .then((data: any) => {
        // console.log(data);
        this.person_status = data;

      })

    console.log('speaker');
    this.activityProvider.getspeaker()
      .then((data: any) => {
        // console.log(data);
        this.speaker = data;

      })


    this.fav.show_FavPaper()
      .then((data: any) => {
        // console.log(data);
        this.showFavPaper = data;

      })

    this.fav.show_FavAco()
      .then((data: any) => {
        // console.log(data);
        this.showFavOther = data;

      })
  }

  // likeOther(ionicButton,detailOther){
  //   if(ionicButton._color === 'light') {
  //     this.fav.favorite(detailOther.aco_id, this.id)
  //
  //       .then((data: any) => {
  //
  //         if (data == null) {
  //           console.log("can't like");
  //           // this.test = false;
  //         }
  //         else {
  //           ionicButton.color = 'danger';
  //           // return this.check =true;
  //
  //         }
  //       });
  //
  //   }
  //
  //   else {
  //
  //     this.fav.unfavorite(detailOther.aco_id, this.id)
  //
  //       .then((data: any) => {
  //
  //         if (data == null) {
  //           console.log("can't unlike");
  //
  //         }
  //         else {
  //           ionicButton.color = 'light';
  //           // return this.check =false;
  //         }
  //       });
  //
  //
  //   }
  //
  // }
  //
  //
  //
  // like(ionicButton,detailPaper) {
  //
  //
  //   if(ionicButton._color === 'light') {
  //     this.fav.favoritePaper(detailPaper.paper_id, this.id)
  //
  //       .then((data: any) => {
  //
  //         if (data == null) {
  //           console.log("can't like");
  //           // this.test = false;
  //         }
  //         else {
  //           ionicButton.color = 'danger';
  //
  //
  //         }
  //       });
  //
  //   }
  //
  //   else {
  //
  //     this.fav.unfavoritePaper(detailPaper.paper_id, this.id)
  //
  //       .then((data: any) => {
  //
  //         if (data == null) {
  //           console.log("can't unlike");
  //
  //         }
  //         else {
  //           ionicButton.color = 'light';
  //
  //         }
  //       });
  //
  //
  //   }
  //
  // }
  //
  // isSelected(event) {
  //   console.log(event);
  //   return 'danger';
  //   // event.target.getAttribute('selected') ? 'primary' : '';
  // }



}
