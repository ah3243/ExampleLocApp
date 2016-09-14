import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
  templateUrl: 'build/pages/map-detail-component/map-detail-component.html',
})
export class MapDetailComponentPage {

  constructor(private navCtrl: NavController) {

  }

}
