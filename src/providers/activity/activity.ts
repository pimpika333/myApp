import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";


@Injectable()
export class ActivityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActivityProvider Provider');
  }

  getActivity(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get('http://127.0.0.1/servicephp/get_data_activity.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }

  getAco(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get(' http://127.0.0.1/servicephp/getActivityOther.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }


  getPaper(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get(' http://127.0.0.1/servicephp/getActivityPaper.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }



            getPerson(){
          return new Promise((resolve,reject)=>{
          this.http.get('path/to/json/file')
          this.http.get('http://127.0.0.1/servicephp/person_year.php')

            .map(res => res )
            .subscribe(data => {
              resolve(data);
            },error1 => {
              reject(error1);
            })
        });
}


  getsession(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get(' http://127.0.0.1/servicephp/session.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }


  getperStatus(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get('http://127.0.0.1/servicephp/person_status.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }


  getspeaker(){
    return new Promise((resolve,reject)=>{
      this.http.get('path/to/json/file')
      this.http.get('http://127.0.0.1/servicephp/speaker.php')

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });
  }



}


