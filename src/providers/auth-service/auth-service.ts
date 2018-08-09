import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { NavParams } from 'ionic-angular';
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";
import {HomePage} from "../../pages/home/home";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  public isLoggedIn: Boolean;
   user: any;

  constructor(public http: HttpClient, public storage: Storage) {

    console.log('Hello AuthServiceProvider Provider');
    this.storage.get('user').then((user) => {
      this.user = user;
      this.isLoggedIn = true;
    });

  }

  doLogin(uname:string,code:any){
    return new Promise((resolve,reject)=>{

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})};

      this.http.post("http://127.0.0.1/servicephp/signIn.php?uname="+uname+"&code="+code, {uname:uname,code:code}, httpOptions)

        .map(res => res )
        .subscribe(data => {
          resolve(data);

          return data;

        },error => {
          reject(error);
        })
    });

  }


  Dologout() {

    this.storage.remove('user').then(() => {
      this.isLoggedIn = false;
      this.user = null;
    });
    this.storage.remove('code').then(() => {
      this.isLoggedIn = false;
      this.user = null;
    });
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  getUser() {
    return this.user;
  }



}
