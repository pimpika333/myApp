import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { NavParams } from 'ionic-angular';
import "rxjs/add/operator/map";

@Injectable()
export class CheckloginProvider {

  constructor(
    public http: HttpClient

  ) {
    console.log('Hello CheckloginProvider Provider');

  }
  doLogin(code:string){
    return new Promise((resolve,reject)=>{

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})};

      this.http.post("http://127.0.0.1/servicephp/somedata.php?code="+code,{code:code},httpOptions)
        .map(res => res )
        .subscribe(data => {
          resolve(data);

        },error => {
          reject(error);
        })
    });
}

}
