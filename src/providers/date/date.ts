import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DateProvider Provider');
  }

  getDate(code:any){

    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})};

      this.http.post("http://127.0.0.1/servicephp/get_date_confer.php?code="+code,{code:code},httpOptions)

        .map(res => res )
        .subscribe(data => {
          resolve(data);
        },error1 => {
          reject(error1);
        })
    });

  }







}
