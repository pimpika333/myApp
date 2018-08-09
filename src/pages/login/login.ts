import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { ToastController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {IndexPage} from "../index";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user:FormGroup;
  uname : string;
  welcome:string = "welcome to International Conference on Knowledge and Smart Technology";
  code :string;
  public isLoggedIn: Boolean;
  loggedInUser: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService : AuthServiceProvider,
              public toastCtrl: ToastController,
              public storage : Storage,
              public formBuilder: FormBuilder,


) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });


  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }
  signIn(position:string){
    this.authService.doLogin(this.uname,this.code)
      .then((data:any)=> {

      if(data == null){

          let toast = this.toastCtrl.create({
            message: 'Invalid email or code, Please contact to organizer',
            duration: 3000,
            position: position
          });

          toast.present(toast);

      }
      else{
        this.loggedInUser = this.authService.getUser();
        localStorage.setItem('user',this.uname);
        localStorage.setItem('User id', data['get']['parconfer_id']);
        localStorage.setItem('code', this.code);
        this.navCtrl.setRoot(IndexPage);

        this.loggedInUser = data['get']['parconfer_id'];
        // console.log("User id : ",this.loggedInUser);

        console.log(data);


      }
    });

  }

  // doJoin(position: string) {
  //   this.authService.doLogin(this.uname,this.id)
  //     .then((data:any)=> {
  //
  //       if(data == null){
  //         let toast = this.toastCtrl.create({
  //           message: 'Invalid code, Please contact to organizer',
  //           duration: 3000,
  //           position: position
  //         });
  //         toast.present(toast);
  //       }
  //       else{
  //         // console.log(data);
  //         localStorage.setItem('code', this.code);
  //         this.navCtrl.setRoot(IndexPage);
  //         return this.storage.set('code', this.code).then(() => {
  //           this.isLoggedIn = true;
  //
  //         });
  //       }
  //     });
  //
  // }

}
