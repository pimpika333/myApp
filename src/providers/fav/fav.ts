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
  _favoritesPaper: string[] = [];
  constructor(public http: HttpClient,  public storage: Storage) {
    console.log('Hello FavProvider Provider');
  if (localStorage.like) {
    if (localStorage.getItem('like') != null) {
      this._favoritesAco = JSON.parse(localStorage.getItem('like'));
    }
    else {
      this._favoritesAco = [];
    }
  }
    if (localStorage.Likepaper) {
      if (localStorage.getItem('Likepaper') != null) {
        this._favoritesPaper = JSON.parse(localStorage.getItem('Likepaper'));
      }
      else {
        this._favoritesPaper = [];
      }
    }

  }
  hasFavPaper(paper_id: any): boolean {
    return (this._favoritesPaper.indexOf(paper_id) > -1);
  };

  hasFavorite(aco_id: any): boolean {
    return (this._favoritesAco.indexOf(aco_id) > -1);
  };
  //------------------------------------------------------fav/unfav activityOther----------------------------------------------------------
  favorite (aco_id:any,id:any = localStorage.getItem('User id')){

    this._favoritesAco.push(aco_id);

    if(localStorage.like){
      if( localStorage.getItem('dataWeb') != null ){
      }
      console.log(localStorage.like=JSON.stringify( this._favoritesAco));

    }else{
      console.log(localStorage.like=JSON.stringify( this._favoritesAco));
    }

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
      localStorage.like=JSON.stringify( this._favoritesAco)
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

  show_FavAco(parconfer_id:any = localStorage.getItem('User id')){
    return new Promise((resolve,reject)=>{



      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})};

      this.http.post("http://127.0.0.1/servicephp/show_fav_aco.php?parconfer_id="+parconfer_id, {parconfer_id:parconfer_id}, httpOptions)

        .map(res => res )
        .subscribe(data => {
          resolve(data);


          if (data != null){

            if(localStorage.like){
              if( localStorage.getItem('like') != null ){
              }
              console.log(localStorage.like=JSON.stringify( data));

            }else{
              console.log(localStorage.like=JSON.stringify( data));
            }
          }
          else {
            this._favoritesAco = [];
          }

          return data;

        },error => {
          reject(error);
        })
    });


  }
  //------------------------------------------------------fav/unfav activityPaper----------------------------------------------------------

  favoritePaper(paper_id:any,id:any = localStorage.getItem('User id')){

    this._favoritesPaper.push(paper_id);
    if(localStorage.Likepaper){
      if( localStorage.getItem('Likepaper') != null ){
      }
      console.log(localStorage.Likepaper=JSON.stringify( this._favoritesPaper));

    }else{
      console.log(localStorage.Likepaper=JSON.stringify( this._favoritesPaper));
    }


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

    let index = this._favoritesPaper.indexOf(paper_id);
    if (index > -1) {
      this._favoritesPaper.splice(index, 1);
      localStorage.Likepaper=JSON.stringify( this._favoritesPaper)
    }
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

  show_FavPaper(parconfer_id:any = localStorage.getItem('User id')){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})};

      this.http.post("http://127.0.0.1/servicephp/show_fav_paper.php?parconfer_id="+parconfer_id, {parconfer_id:parconfer_id}, httpOptions)
        .map(res => res )
        .subscribe(data => {
          resolve(data);

          if (data != null){

            if(localStorage.Likepaper){
              if( localStorage.getItem('Likepaper') != null ){
              }
              console.log(localStorage.Likepaper=JSON.stringify( data));

            }else{
              console.log(localStorage.Likepaper=JSON.stringify( data));
            }
          }
          else {
            this._favoritesPaper = [];
          }

          return data;

        },error => {
          reject(error);
        })
    });

  }



}
