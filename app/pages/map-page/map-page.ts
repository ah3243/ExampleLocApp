import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage }  from '../home/home';
import { MapDetailComponentPage } from '../map-detail-component/map-detail-component';

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
