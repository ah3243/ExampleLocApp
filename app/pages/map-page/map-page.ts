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
       console.log('id: ' + results[0].id);
    }, (error) => { 
        console.log("ERROR: ", JSON.stringify(error)) 
    });
  }

  public addLoc(){
    this.navCtrl.push(HomePage);
  }
  public viewLoc(itemId: number){
    this.navCtrl.push(MapDetailComponentPage, {
        itemNumber: itemId
      });
  }

  public deleteLoc(id: number){
    this.sqlService.remove(id)
     .then((results) => {
       console.log("Removed Item: " + results);
       this.load();
     }, (error) => {
       console.log("ERROR, deleting item: " + error);
     })
  }
}
