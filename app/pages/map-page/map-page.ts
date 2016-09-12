import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage }  from '../home/home';
import { MapDetailComponentPage } from '../map-detail-component/map-detail-component';

/*
  Generated class for the MapPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
