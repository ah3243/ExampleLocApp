import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage }  from '../home/home';
import { MapDetailComponentPage } from '../map-detail-component/map-detail-component';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
  templateUrl: 'build/pages/map-page/map-page.html',
})
export class MapPage{

  constructor(private navCtrl: NavController) {

  }

  addLoc(){
    this.navCtrl.push(HomePage);
  }
  viewLoc(){
    this.navCtrl.push(MapDetailComponentPage);
  }
}
