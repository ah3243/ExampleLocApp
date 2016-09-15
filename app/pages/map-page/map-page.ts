import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite} from 'ionic-native';

import { HomePage }  from '../home/home';
import { MapDetailComponentPage } from '../map-detail-component/map-detail-component';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
  templateUrl: 'build/pages/map-page/map-page.html'
})
export class MapPage{

  public places: Array<Object>

  public constructor(private navCtrl: NavController, private sqlService: SqlService) {
    this.places = [];
  }

  public ionViewDidEnter(){
    console.log('Entering: map-page');
    this.sqlService.refresh(this.places)
        .then((results) => {
          this.places = <Array<Object>>results        
        }, (error) => { console.log("ERROR: ", error) });
  }

  public addLoc(){
    this.navCtrl.push(HomePage);
  }
  public viewLoc(){
    this.navCtrl.push(MapDetailComponentPage);
  }
}
