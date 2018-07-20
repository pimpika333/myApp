import { normalizeURL} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { NavParams } from 'ionic-angular';
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";
import {el} from "@angular/platform-browser/testing/src/browser_util";

/*
  Generated class for the FavProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavProvider {
  _favoritesAco: string[] = [];


  constructor(public http: HttpClient,  public storage: Storage) {
    console.log('Hello FavProvider Provider');
    

  }

  hasFavorite(aco_id: any): boolean {
    return (this._favoritesAco.indexOf(aco_id) > -1);
  };
  //------------------------------------------------------fav/unfav activityOther----------------------------------------------------------
  favorite  (aco_id:any,id:any = localStorage.getItem('User id')){
    this._favoritesAco.push(aco_id);
    return new Promise((resolve,reject)=>{

      this.http.post("http://127.0.0.1/servicephp/addmylist.php?aco_id="+aco_id+"&id="+id,JSON.stringify({aco_id:aco_id,id:id}),
        {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'})
        .map(res => res )
        .subscribe(data => {
          resolve(data);
          // console.log("Provider Fav : ",data);
          return data;



        },error => {
          reject(error);
        })

    });

  }

  unfavorite(aco_id:any,id:any = localStorage.getItem('User id')){

    let index = this._favoritesAco.indexOf(aco_id);
    if (index > -1) {
      this._favoritesAco.splice(index, 1);
    }
    return new Promise((resolve,reject)=>{

      this.http.post("http://127.0.0.1/servicephp/deletemylist.php?aco_id="+aco_id+"&id="+id,JSON.stringify({aco_id:aco_id,id:id}),
        {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'})
        .map(res => res )
        .subscribe(data => {
          resolve(data);
          // console.log("Provider Fav : ",data);
          return data;

        },error => {
          reject(error);
        })
    });

  }
  //-------------------------------------------------------------------------------------------------------------------------------------
  show_FavAco(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://127.0.0.1/servicephp/show_fav_aco.php')
        .map(res => res )
        .subscribe(data => {
          resolve(data);

          return data;

        },error => {
          reject(error);
        })

    });

  }


  //------------------------------------------------------fav/unfav activityPaper----------------------------------------------------------

  favoritePaper(paper_id:any,id:any = localStorage.getItem('User id')){
    return new Promise((resolve,reject)=>{

      this.http.post("http://127.0.0.1/servicephp/addmylistPaper.php?paper_id="+paper_id+"&id="+id,JSON.stringify({paper_id:paper_id,id:id}),
        {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'})
        .map(res => res )
        .subscribe(data => {
          resolve(data);
          // console.log("Provider Fav : ",data);
          return data;

        },error => {
          reject(error);
        })
    });

  }

  unfavoritePaper(paper_id:any,id:any = localStorage.getItem('User id')){


    return new Promise((resolve,reject)=>{

      this.http.post("http://127.0.0.1/servicephp/deletemylistPaper.php?paper_id="+paper_id+"&id="+id,JSON.stringify({paper_id:paper_id,id:id}),
        {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'})
        .map(res => res )
        .subscribe(data => {
          resolve(data);
          // console.log("Provider Fav : ",data);
          return data;

        },error => {
          reject(error);
        })
    });

  }

  show_FavPaper(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://127.0.0.1/servicephp/show_fav_paper.php')
        .map(res => res )
        .subscribe(data => {
          resolve(data);

          return data;

        },error => {
          reject(error);
        })
    });

  }



}
