import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

@Injectable()
export class ShowyearProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShowyearProvider Provider');
  }

  getShowyear(){
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


  checkYear(){
    return new Promise((resolve,reject)=>{


      this.http.get("http://127.0.0.1/servicephp/showyear.php")
        .map(res => res )
        .subscribe(data => {
          resolve(data);

        },error => {
          reject(error);
        })
    });
    }





}
