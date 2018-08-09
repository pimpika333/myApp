import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import {FavProvider} from "../../providers/fav/fav";


@IonicPage()
@Component({
  selector: 'page-detailprogramme',
  templateUrl: 'detailprogramme.html',
})
export class DetailprogrammePage {

  detailAC: Array<any>;
  detailPaper: Array<any>;
  detailOther:Array<any>;
  id:any;
  speaker:any;
  chair_session:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public activityProvider: ActivityProvider,
    public fav:FavProvider
  ) {
    this.id = localStorage.getItem('User id');
    this.detailOther = this.navParams.get('other');
    this.detailAC = this.navParams.get('item');
    this.detailPaper = this.navParams.get('Paper');
  }

  ionViewDidLoad() {

    // console.log('speaker');
    this.activityProvider.getspeaker()
      .then((data: any) => {
        this.speaker = data;

      })

    this.activityProvider.getChair_Session()
      .then((data: any) => {
        this.chair_session = data;

      })
  }



}
