import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

import { HomePage }  from '../home/home';
import { MapDetailComponentPage } from '../map-detail-component/map-detail-component';


@Component({
  templateUrl: 'build/pages/map-page/map-page.html'
})
export class MapPage{

  public places: Array<Object>;
  public base64I: string;

  public constructor(private navCtrl: NavController, private sqlService: SqlService) {
    this.places = [];
  }

  public ionViewDidEnter(){
    console.log('Entering: map-page');
    this.load();
  }

  public load(){
    this.sqlService.refresh().then((results) => {
        this.places = <Array<Object>> results;
      //  this.base64I = this.places[0][0].img;
       console.log('id: ' + results[0].id);
    }, (error) => { 
        console.log("ERROR: ", JSON.stringify(error)) 
    });
  }

  public addLoc(){
    this.navCtrl.push(HomePage);
  }
  public viewLoc(){
    this.navCtrl.push(MapDetailComponentPage);
  }

  public clearLocs(){
    this.sqlService.clear()
      .then((results) => {
       console.log("Tables Cleared: ", results); 
      }, (error) => {
        console.log("Error Clearing Tables: ", error);
      })    
  }
  public deleteLoc(id: number){
    this.sqlService.remove(id)
     .then((results) => {
       console.log("Removed Item: " + results);
     }, (error) => {
       console.log("ERROR, deleting item: " + error);
     })
  }
}
