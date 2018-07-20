import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

/*
  Generated class for the ConferenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConferenceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ConferenceProvider Provider');
  }
  getConference(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get('http://127.0.0.1/servicephp/get_data_confer.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }


}
