import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { ToastController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname : string;
  id : any;
  user : any;
  loggedInUser: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService : AuthServiceProvider,
              public toastCtrl: ToastController,
              public storage : Storage

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn(position:string){
    // console.log(this.email.value,this.password.value);
    this.authService.doLogin(this.uname,this.id)
      .then((data:any)=> {


      if(data == null){
        // alert(JSON.stringify("can't login"));
        let toast = this.toastCtrl.create({
          message: 'Invalid Email!!!',
          duration: 2000,
          position: position
        });

        toast.present(toast);
      }
      else{
        this.loggedInUser = this.authService.getUser();
        localStorage.setItem('user',this.uname);
        localStorage.setItem('User id', data['get']['parconfer_id']);
        this.loggedInUser = data['get']['parconfer_id'];
        console.log("User id : ",this.loggedInUser);

        console.log(data);

        this.navCtrl.push(HomePage);

      }
    });

  }

}
